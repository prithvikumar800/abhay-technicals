import '../core/network/api_client.dart';
import '../core/network/api_endpoints.dart';
import '../models/brand.dart';
import '../models/category.dart';
import '../models/device_model.dart';
import '../models/product.dart';
import '../models/wholesale_tier.dart';

class PaginatedProducts {
  final List<Product> products;
  final int page;
  final int limit;
  final int totalItems;
  final int totalPages;

  const PaginatedProducts({
    required this.products,
    required this.page,
    required this.limit,
    required this.totalItems,
    required this.totalPages,
  });
}

class CatalogueRepository {
  final ApiClient _apiClient;

  CatalogueRepository({required ApiClient apiClient}) : _apiClient = apiClient;

  Future<List<Category>> getCategories() async {
    try {
      final response = await _apiClient.get(ApiEndpoints.categories);
      final list = (response['data'] ?? response) as List?;
      if (list != null && list.isNotEmpty) {
        return list.map((item) => Category.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (_) {
      // Fallback to development fixtures if API is offline or returns empty
    }
    return _devCategories;
  }

  Future<List<Brand>> getBrands() async {
    try {
      final response = await _apiClient.get(ApiEndpoints.brands);
      final list = (response['data'] ?? response) as List?;
      if (list != null && list.isNotEmpty) {
        return list.map((item) => Brand.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (_) {
      // Fallback to development fixtures
    }
    return _devBrands;
  }

  Future<List<DeviceModel>> getModelsByBrand(String brandId) async {
    try {
      final response = await _apiClient.get('/brands/$brandId/models');
      final list = (response['data'] ?? response) as List?;
      if (list != null && list.isNotEmpty) {
        return list.map((item) => DeviceModel.fromJson(item as Map<String, dynamic>)).toList();
      }
    } catch (_) {
      // Fallback to development fixtures
    }
    final brand = _devBrands.firstWhere(
      (b) => b.id == brandId || b.slug == brandId,
      orElse: () => _devBrands.first,
    );
    return brand.models;
  }

  Future<PaginatedProducts> getProducts({
    String? categorySlug,
    String? brandSlug,
    String? modelSlug,
    String? search,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'page': page,
        'limit': limit,
      };
      if (categorySlug != null && categorySlug.isNotEmpty) queryParams['categorySlug'] = categorySlug;
      if (brandSlug != null && brandSlug.isNotEmpty) queryParams['brandSlug'] = brandSlug;
      if (modelSlug != null && modelSlug.isNotEmpty) queryParams['modelSlug'] = modelSlug;
      if (search != null && search.isNotEmpty) queryParams['search'] = search;

      final response = await _apiClient.get(
        ApiEndpoints.products,
        queryParameters: queryParams,
      );

      final dataList = response['data'] as List?;
      final pagination = response['pagination'] as Map<String, dynamic>? ?? {};

      if (dataList != null && dataList.isNotEmpty) {
        final products = dataList.map((p) => Product.fromJson(p as Map<String, dynamic>)).toList();
        return PaginatedProducts(
          products: products,
          page: pagination['page'] ?? page,
          limit: pagination['limit'] ?? limit,
          totalItems: pagination['totalItems'] ?? products.length,
          totalPages: pagination['totalPages'] ?? 1,
        );
      }
    } catch (_) {
      // Fallback to development fixtures
    }

    // Filter dev products locally when running offline/mock mode
    var filtered = _devProducts;
    if (categorySlug != null && categorySlug.isNotEmpty) {
      filtered = filtered.where((p) => p.category?.toLowerCase() == categorySlug.toLowerCase()).toList();
    }
    if (brandSlug != null && brandSlug.isNotEmpty) {
      filtered = filtered.where((p) => p.brand?.toLowerCase() == brandSlug.toLowerCase()).toList();
    }
    if (modelSlug != null && modelSlug.isNotEmpty) {
      filtered = filtered.where((p) =>
          p.compatibility.toLowerCase().contains(modelSlug.toLowerCase()) ||
          p.compatibleModels.any((m) => m.toLowerCase().contains(modelSlug.toLowerCase()))).toList();
    }
    if (search != null && search.isNotEmpty) {
      final q = search.toLowerCase();
      filtered = filtered.where((p) =>
          p.name.toLowerCase().contains(q) ||
          p.sku.toLowerCase().contains(q) ||
          p.compatibility.toLowerCase().contains(q)).toList();
    }

    final startIndex = (page - 1) * limit;
    final paged = filtered.skip(startIndex).take(limit).toList();

    return PaginatedProducts(
      products: paged,
      page: page,
      limit: limit,
      totalItems: filtered.length,
      totalPages: (filtered.length / limit).ceil().clamp(1, 999),
    );
  }

  Future<Product?> getProductBySlugOrSku(String identifier) async {
    try {
      final response = await _apiClient.get('/products/$identifier');
      final data = response['data'] ?? response;
      if (data != null && data is Map<String, dynamic>) {
        return Product.fromJson(data);
      }
    } catch (_) {
      // Fallback
    }

    return _devProducts.firstWhere(
      (p) => p.sku.toLowerCase() == identifier.toLowerCase() || p.id == identifier,
      orElse: () => _devProducts.first,
    );
  }

  // Development Fallback Fixtures (Clearly identified development data for mock fallback)
  static final List<Category> _devCategories = [
    const Category(id: '1', name: 'Mobile Batteries', slug: 'batteries', icon: 'battery_charging_full', productCount: 42),
    const Category(id: '2', name: 'Charging Flex / PCB', slug: 'charging-flex', icon: 'usb', productCount: 35),
    const Category(id: '3', name: 'Back Panels & Glass', slug: 'back-panels', icon: 'phone_android', productCount: 28),
    const Category(id: '4', name: 'Camera Glass & Lens', slug: 'camera-glass', icon: 'camera_alt', productCount: 19),
    const Category(id: '5', name: 'Loudspeakers & Buzzers', slug: 'speakers', icon: 'volume_up', productCount: 24),
    const Category(id: '6', name: 'OCA Glass & Polarizers', slug: 'oca-glass', icon: 'layers', productCount: 15),
    const Category(id: '7', name: 'Technician Repair Tools', slug: 'tools', icon: 'build', productCount: 18),
  ];

  static final List<Brand> _devBrands = [
    const Brand(
      id: 'vivo',
      name: 'Vivo',
      slug: 'vivo',
      models: [
        DeviceModel(id: 'y11', name: 'Vivo Y11 2019', brandId: 'vivo', brandName: 'Vivo', releaseYear: '2019', partCount: 14),
        DeviceModel(id: 'y12', name: 'Vivo Y12', brandId: 'vivo', brandName: 'Vivo', releaseYear: '2019', partCount: 12),
        DeviceModel(id: 'y20', name: 'Vivo Y20', brandId: 'vivo', brandName: 'Vivo', releaseYear: '2020', partCount: 16),
        DeviceModel(id: 'v20', name: 'Vivo V20', brandId: 'vivo', brandName: 'Vivo', releaseYear: '2020', partCount: 11),
      ],
    ),
    const Brand(
      id: 'oppo',
      name: 'Oppo',
      slug: 'oppo',
      models: [
        DeviceModel(id: 'a3s', name: 'Oppo A3s', brandId: 'oppo', brandName: 'Oppo', releaseYear: '2018', partCount: 15),
        DeviceModel(id: 'a53', name: 'Oppo A53', brandId: 'oppo', brandName: 'Oppo', releaseYear: '2020', partCount: 12),
        DeviceModel(id: 'f11-pro', name: 'Oppo F11 Pro', brandId: 'oppo', brandName: 'Oppo', releaseYear: '2019', partCount: 9),
      ],
    ),
    const Brand(
      id: 'realme',
      name: 'Realme',
      slug: 'realme',
      models: [
        DeviceModel(id: 'c2', name: 'Realme C2', brandId: 'realme', brandName: 'Realme', releaseYear: '2019', partCount: 13),
        DeviceModel(id: 'c3', name: 'Realme C3', brandId: 'realme', brandName: 'Realme', releaseYear: '2020', partCount: 11),
        DeviceModel(id: '5-pro', name: 'Realme 5 Pro', brandId: 'realme', brandName: 'Realme', releaseYear: '2019', partCount: 14),
      ],
    ),
    const Brand(
      id: 'xiaomi',
      name: 'Xiaomi / Redmi',
      slug: 'xiaomi',
      models: [
        DeviceModel(id: 'note-7-pro', name: 'Redmi Note 7 Pro', brandId: 'xiaomi', brandName: 'Xiaomi', releaseYear: '2019', partCount: 18),
        DeviceModel(id: 'note-8', name: 'Redmi Note 8', brandId: 'xiaomi', brandName: 'Xiaomi', releaseYear: '2019', partCount: 15),
        DeviceModel(id: 'note-9-pro', name: 'Redmi Note 9 Pro', brandId: 'xiaomi', brandName: 'Xiaomi', releaseYear: '2020', partCount: 17),
      ],
    ),
    const Brand(
      id: 'samsung',
      name: 'Samsung',
      slug: 'samsung',
      models: [
        DeviceModel(id: 'm21', name: 'Samsung Galaxy M21', brandId: 'samsung', brandName: 'Samsung', releaseYear: '2020', partCount: 13),
        DeviceModel(id: 'm31', name: 'Samsung Galaxy M31', brandId: 'samsung', brandName: 'Samsung', releaseYear: '2020', partCount: 14),
        DeviceModel(id: 'a50', name: 'Samsung Galaxy A50', brandId: 'samsung', brandName: 'Samsung', releaseYear: '2019', partCount: 12),
      ],
    ),
  ];

  static final List<Product> _devProducts = [
    const Product(
      id: 'prod-001',
      name: 'Original 5000mAh Battery for Vivo Y11 (B-K3)',
      sku: 'BAT-VIV-Y11-BK3',
      brand: 'Vivo',
      category: 'Mobile Batteries',
      compatibility: 'Fits Vivo Y11 2019 / Vivo Y12 / Vivo Y15',
      compatibleModels: ['Vivo Y11 2019', 'Vivo Y12', 'Vivo Y15'],
      description: 'High capacity 5000mAh Lithium-Polymer replacement battery cell with dual IC protection and zero cycle wear for professional workshop repairs.',
      specifications: {'Capacity': '5000 mAh', 'Voltage': '3.85V', 'Model Code': 'B-K3', 'Warranty': '6 Months Testing'},
      images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'],
      retailPrice: 599.0,
      salePrice: 499.0,
      stock: 45,
      moq: 1,
      isFeatured: true,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 5, unitPrice: 380.0),
        WholesaleTier(minQuantity: 10, unitPrice: 350.0),
        WholesaleTier(minQuantity: 25, unitPrice: 320.0),
      ],
    ),
    const Product(
      id: 'prod-002',
      name: 'Charging Port PCB Board Flex for Vivo Y11 / Y12',
      sku: 'FLX-VIV-Y11-SUB',
      brand: 'Vivo',
      category: 'Charging Flex / PCB',
      compatibility: 'Fits Vivo Y11 2019 / Vivo Y12 / Vivo Y15',
      compatibleModels: ['Vivo Y11 2019', 'Vivo Y12'],
      description: 'Sub-board dock connector flex cable with integrated microphone and fast charging support.',
      specifications: {'Connector': 'Micro USB', 'Microphone': 'Integrated OEM Grade', 'Warranty': 'Checking Warranty'},
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'],
      retailPrice: 199.0,
      salePrice: 149.0,
      stock: 80,
      moq: 2,
      isFeatured: true,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 10, unitPrice: 95.0),
        WholesaleTier(minQuantity: 25, unitPrice: 80.0),
      ],
    ),
    const Product(
      id: 'prod-003',
      name: 'Premium Glass Back Panel for Vivo Y11 (Mineral Blue)',
      sku: 'PAN-VIV-Y11-BLU',
      brand: 'Vivo',
      category: 'Back Panels & Glass',
      compatibility: 'Fits Vivo Y11 2019 (1906)',
      compatibleModels: ['Vivo Y11 2019'],
      description: 'Exact color-match replacement rear housing door with pre-cut camera lens cutout and adhesive tape.',
      specifications: {'Color': 'Mineral Blue', 'Material': 'Polycarbonate Composite', 'Adhesive': 'Pre-installed'},
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'],
      retailPrice: 249.0,
      salePrice: 199.0,
      stock: 30,
      moq: 1,
      isNew: true,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 5, unitPrice: 160.0),
        WholesaleTier(minQuantity: 10, unitPrice: 140.0),
      ],
    ),
    const Product(
      id: 'prod-004',
      name: 'Original 4000mAh Battery for Redmi Note 7 Pro (BN4A)',
      sku: 'BAT-RED-N7P-BN4A',
      brand: 'Xiaomi / Redmi',
      category: 'Mobile Batteries',
      compatibility: 'Fits Redmi Note 7 / Redmi Note 7 Pro',
      compatibleModels: ['Redmi Note 7', 'Redmi Note 7 Pro'],
      description: 'Grade-A OEM battery with stable discharge curves and temperature monitoring thermal sensor.',
      specifications: {'Capacity': '4000 mAh', 'Model Code': 'BN4A', 'Voltage': '3.85V', 'Warranty': '6 Months Testing'},
      images: ['https://images.unsplash.com/photo-1609081219090-a6d8173087ec?auto=format&fit=crop&w=600&q=80'],
      retailPrice: 549.0,
      salePrice: 479.0,
      stock: 55,
      moq: 1,
      isFeatured: true,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 5, unitPrice: 370.0),
        WholesaleTier(minQuantity: 10, unitPrice: 340.0),
      ],
    ),
    const Product(
      id: 'prod-005',
      name: 'Type-C Sub-Board Charging Dock for Redmi Note 8',
      sku: 'FLX-RED-N8-TC',
      brand: 'Xiaomi / Redmi',
      category: 'Charging Flex / PCB',
      compatibility: 'Fits Redmi Note 8',
      compatibleModels: ['Redmi Note 8'],
      description: 'OEM specification Type-C charging port board with fast charging lines and antenna connector.',
      specifications: {'Connector': 'USB Type-C', 'Component': 'Sub-board with Mic'},
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'],
      retailPrice: 220.0,
      salePrice: 175.0,
      stock: 60,
      moq: 2,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 10, unitPrice: 110.0),
        WholesaleTier(minQuantity: 25, unitPrice: 95.0),
      ],
    ),
  ];
}
