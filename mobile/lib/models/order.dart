import 'shipment.dart';
import 'user.dart';

class OrderItem {
  final String id;
  final String productId;
  final String productName;
  final String sku;
  final String? productImage;
  final int quantity;
  final double unitPrice;
  final double totalPrice;

  const OrderItem({
    required this.id,
    required this.productId,
    required this.productName,
    required this.sku,
    this.productImage,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id']?.toString() ?? '',
      productId: json['productId']?.toString() ?? json['product']?['id']?.toString() ?? '',
      productName: json['productName']?.toString() ?? json['product']?['name']?.toString() ?? 'Product',
      sku: json['sku']?.toString() ?? json['product']?['sku']?.toString() ?? '',
      productImage: json['productImage']?.toString() ?? json['product']?['imageUrl']?.toString(),
      quantity: json['quantity'] is int
          ? json['quantity'] as int
          : int.tryParse(json['quantity']?.toString() ?? '1') ?? 1,
      unitPrice: json['unitPrice'] is num
          ? (json['unitPrice'] as num).toDouble()
          : double.tryParse(json['unitPrice']?.toString() ?? '0') ?? 0.0,
      totalPrice: json['totalPrice'] is num
          ? (json['totalPrice'] as num).toDouble()
          : double.tryParse(json['totalPrice']?.toString() ?? '0') ?? 0.0,
    );
  }
}

class Order {
  final String id;
  final String orderNumber;
  final String status;
  final String paymentStatus;
  final String paymentMethod;
  final List<OrderItem> items;
  final double subtotal;
  final double tax;
  final double shippingFee;
  final double discount;
  final double totalAmount;
  final Address? shippingAddress;
  final Shipment? shipment;
  final DateTime createdAt;

  const Order({
    required this.id,
    required this.orderNumber,
    required this.status,
    required this.paymentStatus,
    required this.paymentMethod,
    required this.items,
    required this.subtotal,
    this.tax = 0.0,
    this.shippingFee = 0.0,
    this.discount = 0.0,
    required this.totalAmount,
    this.shippingAddress,
    this.shipment,
    required this.createdAt,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    List<OrderItem> itemsList = [];
    if (json['items'] is List) {
      itemsList = (json['items'] as List)
          .map((i) => OrderItem.fromJson(i as Map<String, dynamic>))
          .toList();
    }

    return Order(
      id: json['id']?.toString() ?? '',
      orderNumber: json['orderNumber']?.toString() ?? 'ORD-${json['id']}',
      status: json['status']?.toString() ?? 'PENDING',
      paymentStatus: json['paymentStatus']?.toString() ?? 'PENDING',
      paymentMethod: json['paymentMethod']?.toString() ?? 'PREPAID',
      items: itemsList,
      subtotal: json['subtotal'] is num
          ? (json['subtotal'] as num).toDouble()
          : double.tryParse(json['subtotal']?.toString() ?? '0') ?? 0.0,
      tax: json['tax'] is num
          ? (json['tax'] as num).toDouble()
          : double.tryParse(json['tax']?.toString() ?? '0') ?? 0.0,
      shippingFee: json['shippingFee'] is num
          ? (json['shippingFee'] as num).toDouble()
          : double.tryParse(json['shippingFee']?.toString() ?? '0') ?? 0.0,
      discount: json['discount'] is num
          ? (json['discount'] as num).toDouble()
          : double.tryParse(json['discount']?.toString() ?? '0') ?? 0.0,
      totalAmount: json['totalAmount'] is num
          ? (json['totalAmount'] as num).toDouble()
          : double.tryParse(json['totalAmount']?.toString() ?? '0') ?? 0.0,
      shippingAddress: json['shippingAddress'] != null
          ? Address.fromJson(json['shippingAddress'] as Map<String, dynamic>)
          : null,
      shipment: json['shipment'] != null
          ? Shipment.fromJson(json['shipment'] as Map<String, dynamic>)
          : null,
      createdAt: json['createdAt'] != null
          ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
