class DeviceModel {
  final String id;
  final String name;
  final String brandId;
  final String? brandName;
  final String? releaseYear;
  final int partCount;

  const DeviceModel({
    required this.id,
    required this.name,
    required this.brandId,
    this.brandName,
    this.releaseYear,
    this.partCount = 0,
  });

  factory DeviceModel.fromJson(Map<String, dynamic> json) {
    return DeviceModel(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      brandId: json['brandId']?.toString() ?? '',
      brandName: json['brandName']?.toString() ?? json['brand']?['name']?.toString(),
      releaseYear: json['releaseYear']?.toString(),
      partCount: json['partCount'] is int
          ? json['partCount'] as int
          : int.tryParse(json['partCount']?.toString() ?? '0') ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'brandId': brandId,
        'brandName': brandName,
        'releaseYear': releaseYear,
        'partCount': partCount,
      };
}
