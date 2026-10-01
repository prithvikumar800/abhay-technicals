class WholesaleTier {
  final int minQuantity;
  final double unitPrice;

  const WholesaleTier({
    required this.minQuantity,
    required this.unitPrice,
  });

  factory WholesaleTier.fromJson(Map<String, dynamic> json) {
    return WholesaleTier(
      minQuantity: json['minQuantity'] is int
          ? json['minQuantity'] as int
          : int.tryParse(json['minQuantity'].toString()) ?? 1,
      unitPrice: json['unitPrice'] is num
          ? (json['unitPrice'] as num).toDouble()
          : double.tryParse(json['unitPrice'].toString()) ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() => {
        'minQuantity': minQuantity,
        'unitPrice': unitPrice,
      };
}
