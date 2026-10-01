import 'wholesale_tier.dart';

class Product {
  final String id;
  final String name;
  final String sku;
  final String? brand;
  final String? category;
  final String compatibility;
  final List<String> compatibleModels;
  final String? description;
  final Map<String, String> specifications;
  final List<String> images;
  final double retailPrice;
  final double? salePrice;
  final int stock;
  final int moq;
  final List<WholesaleTier> wholesaleTiers;
  final bool isFeatured;
  final bool isNew;

  const Product({
    required this.id,
    required this.name,
    required this.sku,
    this.brand,
    this.category,
    this.compatibility = '',
    this.compatibleModels = const [],
    this.description,
    this.specifications = const {},
    this.images = const [],
    required this.retailPrice,
    this.salePrice,
    this.stock = 0,
    this.moq = 1,
    this.wholesaleTiers = const [],
    this.isFeatured = false,
    this.isNew = false,
  });

  bool get isOutOfStock => stock <= 0;
  double get effectivePrice => salePrice != null && salePrice! > 0 ? salePrice! : retailPrice;

  double getUnitPriceForQuantity(int quantity, {bool isWholesaleAuthorized = false}) {
    if (!isWholesaleAuthorized || wholesaleTiers.isEmpty) {
      return effectivePrice;
    }

    // Sort descending by minQuantity to find the highest qualified tier
    final sortedTiers = List<WholesaleTier>.from(wholesaleTiers)
      ..sort((a, b) => b.minQuantity.compareTo(a.minQuantity));

    for (final tier in sortedTiers) {
      if (quantity >= tier.minQuantity) {
        return tier.unitPrice;
      }
    }

    return effectivePrice;
  }

  factory Product.fromJson(Map<String, dynamic> json) {
    List<String> imgList = [];
    if (json['images'] is List) {
      imgList = (json['images'] as List).map((e) => e.toString()).toList();
    } else if (json['imageUrl'] != null) {
      imgList = [json['imageUrl'].toString()];
    }

    List<String> compModels = [];
    if (json['compatibleModels'] is List) {
      compModels = (json['compatibleModels'] as List).map((e) => e.toString()).toList();
    }

    Map<String, String> specs = {};
    if (json['specifications'] is Map) {
      (json['specifications'] as Map).forEach((k, v) {
        specs[k.toString()] = v.toString();
      });
    }

    List<WholesaleTier> tiers = [];
    if (json['wholesaleTiers'] is List) {
      tiers = (json['wholesaleTiers'] as List)
          .map((t) => WholesaleTier.fromJson(t as Map<String, dynamic>))
          .toList();
    }

    return Product(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      sku: json['sku']?.toString() ?? '',
      brand: json['brand'] is Map ? json['brand']['name']?.toString() : json['brand']?.toString(),
      category: json['category'] is Map ? json['category']['name']?.toString() : json['category']?.toString(),
      compatibility: json['compatibility']?.toString() ?? '',
      compatibleModels: compModels,
      description: json['description']?.toString(),
      specifications: specs,
      images: imgList,
      retailPrice: json['retailPrice'] is num
          ? (json['retailPrice'] as num).toDouble()
          : double.tryParse(json['retailPrice']?.toString() ?? '0') ?? 0.0,
      salePrice: json['salePrice'] != null
          ? (json['salePrice'] is num
              ? (json['salePrice'] as num).toDouble()
              : double.tryParse(json['salePrice'].toString()))
          : null,
      stock: json['stock'] is int
          ? json['stock'] as int
          : int.tryParse(json['stock']?.toString() ?? '0') ?? 0,
      moq: json['moq'] is int
          ? json['moq'] as int
          : int.tryParse(json['moq']?.toString() ?? '1') ?? 1,
      wholesaleTiers: tiers,
      isFeatured: json['isFeatured'] == true,
      isNew: json['isNew'] == true,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'sku': sku,
        'brand': brand,
        'category': category,
        'compatibility': compatibility,
        'compatibleModels': compatibleModels,
        'description': description,
        'specifications': specifications,
        'images': images,
        'retailPrice': retailPrice,
        'salePrice': salePrice,
        'stock': stock,
        'moq': moq,
        'wholesaleTiers': wholesaleTiers.map((t) => t.toJson()).toList(),
        'isFeatured': isFeatured,
        'isNew': isNew,
      };
}
