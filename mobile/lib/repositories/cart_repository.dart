import '../core/config/app_config.dart';
import '../core/errors/exceptions.dart';
import '../core/network/api_client.dart';
import '../core/network/api_endpoints.dart';
import '../models/cart_item.dart';
import '../models/product.dart';

class CartSummary {
  final List<CartItem> items;
  final double subtotal;
  final double shippingFee;
  final double discount;
  final double total;
  final bool isEligibleForFreeShipping;
  final double freeShippingShortfall;

  const CartSummary({
    required this.items,
    required this.subtotal,
    required this.shippingFee,
    required this.discount,
    required this.total,
    required this.isEligibleForFreeShipping,
    required this.freeShippingShortfall,
  });

  int get totalItemCount => items.fold(0, (sum, item) => sum + item.quantity);
}

class CartRepository {
  final ApiClient _apiClient;
  final List<CartItem> _localCart = [];

  CartRepository({required ApiClient apiClient}) : _apiClient = apiClient;

  List<CartItem> get items => List.unmodifiable(_localCart);

  CartSummary calculateSummary() {
    double subtotal = 0.0;
    for (final item in _localCart) {
      subtotal += item.totalPrice;
    }

    final isFreeShipping = subtotal >= AppConfig.freeShippingThreshold || _localCart.isEmpty;
    final shippingFee = isFreeShipping ? 0.0 : AppConfig.standardShippingFee;
    final shortfall = isFreeShipping
        ? 0.0
        : (AppConfig.freeShippingThreshold - subtotal).clamp(0.0, AppConfig.freeShippingThreshold);

    final total = subtotal + shippingFee;

    return CartSummary(
      items: List.unmodifiable(_localCart),
      subtotal: subtotal,
      shippingFee: shippingFee,
      discount: 0.0,
      total: total,
      isEligibleForFreeShipping: isFreeShipping,
      freeShippingShortfall: shortfall,
    );
  }

  Future<CartSummary> getCart() async {
    try {
      final response = await _apiClient.get(ApiEndpoints.cart);
      final data = response['data'] ?? response;
      if (data is Map<String, dynamic> && data['items'] is List) {
        _localCart.clear();
        final rawItems = data['items'] as List;
        for (final itemJson in rawItems) {
          _localCart.add(CartItem.fromJson(itemJson as Map<String, dynamic>));
        }
      }
    } catch (_) {
      // Local in-memory cart fallback
    }

    return calculateSummary();
  }

  Future<CartSummary> addItem(
    Product product, {
    int quantity = 1,
    bool isWholesale = false,
  }) async {
    if (product.isOutOfStock) {
      throw const ApiException('Product is currently out of stock.');
    }

    final effectiveQty = quantity < product.moq ? product.moq : quantity;

    try {
      await _apiClient.post(
        ApiEndpoints.cartItems,
        body: {
          'productId': product.id,
          'quantity': effectiveQty,
        },
      );
    } catch (_) {
      // Allow seamless offline-first experience if API is unreachable
    }

    final existingIndex = _localCart.indexWhere((i) => i.productId == product.id);
    if (existingIndex >= 0) {
      final existing = _localCart[existingIndex];
      final newQty = existing.quantity + effectiveQty;
      final newUnitPrice = product.getUnitPriceForQuantity(
        newQty,
        isWholesaleAuthorized: isWholesale,
      );
      existing.quantity = newQty;
      existing.unitPrice = newUnitPrice;
    } else {
      _localCart.add(
        CartItem.fromProduct(
          product,
          quantity: effectiveQty,
          isWholesaleAuthorized: isWholesale,
        ),
      );
    }

    return calculateSummary();
  }

  Future<CartSummary> updateQuantity(
    String itemId,
    int newQuantity, {
    bool isWholesale = false,
  }) async {
    final index = _localCart.indexWhere((i) => i.id == itemId);
    if (index < 0) return calculateSummary();

    final item = _localCart[index];

    if (newQuantity <= 0) {
      return removeItem(itemId);
    }

    if (newQuantity < item.moq) {
      throw MoqException(requiredMoq: item.moq, currentQuantity: newQuantity);
    }

    try {
      await _apiClient.patch(
        ApiEndpoints.cartItem(itemId),
        body: {'quantity': newQuantity},
      );
    } catch (_) {
      // In-memory fallback
    }

    item.quantity = newQuantity;
    // Re-evaluate unit price if wholesale tiers apply
    if (isWholesale && item.wholesaleTiers.isNotEmpty) {
      final sortedTiers = List.from(item.wholesaleTiers)
        ..sort((a, b) => b.minQuantity.compareTo(a.minQuantity));
      for (final tier in sortedTiers) {
        if (newQuantity >= tier.minQuantity) {
          item.unitPrice = tier.unitPrice;
          break;
        }
      }
    }

    return calculateSummary();
  }

  Future<CartSummary> removeItem(String itemId) async {
    try {
      await _apiClient.delete(ApiEndpoints.cartItem(itemId));
    } catch (_) {
      // In-memory fallback
    }

    _localCart.removeWhere((i) => i.id == itemId);
    return calculateSummary();
  }

  Future<CartSummary> clearCart() async {
    try {
      await _apiClient.delete(ApiEndpoints.cart);
    } catch (_) {
      // In-memory fallback
    }

    _localCart.clear();
    return calculateSummary();
  }
}
