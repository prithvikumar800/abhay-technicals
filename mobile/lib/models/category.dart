class Category {
  final String id;
  final String name;
  final String slug;
  final String? icon;
  final String? description;
  final int productCount;

  const Category({
    required this.id,
    required this.name,
    required this.slug,
    this.icon,
    this.description,
    this.productCount = 0,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      slug: json['slug']?.toString() ?? '',
      icon: json['icon']?.toString(),
      description: json['description']?.toString(),
      productCount: json['productCount'] is int
          ? json['productCount'] as int
          : int.tryParse(json['productCount']?.toString() ?? '0') ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'slug': slug,
        'icon': icon,
        'description': description,
        'productCount': productCount,
      };
}
