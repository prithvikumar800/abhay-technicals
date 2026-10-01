import 'package:flutter/foundation.dart';
import '../models/cart_item.dart';
import '../models/product.dart';
import '../repositories/cart_repository.dart';

class CartProvider extends ChangeNotifier {
  final CartRepository _cartRepository;

  CartSummary _summary = const CartSummary(
    items: [],
    subtotal: 0.0,
    shippingFee: 0.0,
    discount: 0.0,
    total: 0.0,
    isEligibleForFreeShipping: true,
    freeShippingShortfall: 0.0,
  );

  bool _isLoading = false;
  String? _errorMessage;

  CartProvider({required CartRepository cartRepository}) : _cartRepository = cartRepository;

  CartSummary get summary => _summary;
  List<CartItem> get items => _summary.items;
  double get subtotal => _summary.subtotal;
  double get shippingFee => _summary.shippingFee;
  double get discount => _summary.discount;
  double get total => _summary.total;
  bool get isEmpty => _summary.items.isEmpty;
  int get itemCount => _summary.totalItemCount;
  bool get isEligibleForFreeShipping => _summary.isEligibleForFreeShipping;
  double get freeShippingShortfall => _summary.freeShippingShortfall;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadCart() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _summary = await _cartRepository.getCart();
    } catch (e) {
      _errorMessage = 'Could not load your cart items.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> addToCart(
    Product product, {
    int quantity = 1,
    bool isWholesale = false,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _summary = await _cartRepository.addItem(
        product,
        quantity: quantity,
        isWholesale: isWholesale,
      );
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> updateQuantity(
    String itemId,
    int newQuantity, {
    bool isWholesale = false,
  }) async {
    try {
      _summary = await _cartRepository.updateQuantity(
        itemId,
        newQuantity,
        isWholesale: isWholesale,
      );
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      notifyListeners();
    }
  }

  Future<void> removeItem(String itemId) async {
    _summary = await _cartRepository.removeItem(itemId);
    notifyListeners();
  }

  Future<void> clearCart() async {
    _summary = await _cartRepository.clearCart();
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
