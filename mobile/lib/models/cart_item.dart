import 'product.dart';
import 'wholesale_tier.dart';

class CartItem {
  final String id;
  final String productId;
  final String productName;
  final String productSku;
  final String? productImage;
  final String compatibility;
  int quantity;
  double unitPrice;
  final int moq;
  final int maxStock;
  final List<WholesaleTier> wholesaleTiers;

  CartItem({
    required this.id,
    required this.productId,
    required this.productName,
    required this.productSku,
    this.productImage,
    this.compatibility = '',
    required this.quantity,
    required this.unitPrice,
    this.moq = 1,
    this.maxStock = 999,
    this.wholesaleTiers = const [],
  });

  double get totalPrice => unitPrice * quantity;

  factory CartItem.fromProduct(
    Product product, {
    int quantity = 1,
    bool isWholesaleAuthorized = false,
  }) {
    final effectiveQty = quantity < product.moq ? product.moq : quantity;
    final price = product.getUnitPriceForQuantity(
      effectiveQty,
      isWholesaleAuthorized: isWholesaleAuthorized,
    );

    return CartItem(
      id: 'cart_${product.id}_${DateTime.now().millisecondsSinceEpoch}',
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      productImage: product.images.isNotEmpty ? product.images.first : null,
      compatibility: product.compatibility,
      quantity: effectiveQty,
      unitPrice: price,
      moq: product.moq,
      maxStock: product.stock,
      wholesaleTiers: product.wholesaleTiers,
    );
  }

  factory CartItem.fromJson(Map<String, dynamic> json) {
    List<WholesaleTier> tiers = [];
    if (json['wholesaleTiers'] is List) {
      tiers = (json['wholesaleTiers'] as List)
          .map((t) => WholesaleTier.fromJson(t as Map<String, dynamic>))
          .toList();
    }

    return CartItem(
      id: json['id']?.toString() ?? '',
      productId: json['productId']?.toString() ?? json['product']?['id']?.toString() ?? '',
      productName: json['productName']?.toString() ?? json['product']?['name']?.toString() ?? '',
      productSku: json['productSku']?.toString() ?? json['product']?['sku']?.toString() ?? '',
      productImage: json['productImage']?.toString() ?? json['product']?['imageUrl']?.toString(),
      compatibility: json['compatibility']?.toString() ?? '',
      quantity: json['quantity'] is int
          ? json['quantity'] as int
          : int.tryParse(json['quantity']?.toString() ?? '1') ?? 1,
      unitPrice: json['unitPrice'] is num
          ? (json['unitPrice'] as num).toDouble()
          : double.tryParse(json['unitPrice']?.toString() ?? '0') ?? 0.0,
      moq: json['moq'] is int
          ? json['moq'] as int
          : int.tryParse(json['moq']?.toString() ?? '1') ?? 1,
      maxStock: json['maxStock'] is int
          ? json['maxStock'] as int
          : int.tryParse(json['maxStock']?.toString() ?? '999') ?? 999,
      wholesaleTiers: tiers,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'productId': productId,
        'productName': productName,
        'productSku': productSku,
        'productImage': productImage,
        'compatibility': compatibility,
        'quantity': quantity,
        'unitPrice': unitPrice,
        'moq': moq,
        'maxStock': maxStock,
        'wholesaleTiers': wholesaleTiers.map((t) => t.toJson()).toList(),
        'totalPrice': totalPrice,
      };
}
