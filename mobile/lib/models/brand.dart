import 'device_model.dart';

class Brand {
  final String id;
  final String name;
  final String slug;
  final String? logoUrl;
  final List<DeviceModel> models;

  const Brand({
    required this.id,
    required this.name,
    required this.slug,
    this.logoUrl,
    this.models = const [],
  });

  factory Brand.fromJson(Map<String, dynamic> json) {
    var rawModels = json['models'];
    List<DeviceModel> modelList = [];
    if (rawModels is List) {
      modelList = rawModels
          .map((m) => DeviceModel.fromJson(m as Map<String, dynamic>))
          .toList();
    }

    return Brand(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      slug: json['slug']?.toString() ?? '',
      logoUrl: json['logoUrl']?.toString(),
      models: modelList,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'slug': slug,
        'logoUrl': logoUrl,
        'models': models.map((m) => m.toJson()).toList(),
      };
}
