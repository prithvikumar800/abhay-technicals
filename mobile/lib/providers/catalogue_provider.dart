import 'package:flutter/foundation.dart' hide Category;
import '../models/brand.dart';
import '../models/category.dart';
import '../models/product.dart';
import '../repositories/catalogue_repository.dart';

class CatalogueProvider extends ChangeNotifier {
  final CatalogueRepository _repository;

  List<Category> _categories = [];
  List<Brand> _brands = [];
  List<Product> _products = [];
  List<Product> _featuredProducts = [];

  bool _isLoading = false;
  bool _isLoadingMore = false;
  String? _errorMessage;

  String? _selectedCategory;
  String? _selectedBrand;
  String? _selectedModel;
  String _searchQuery = '';

  int _currentPage = 1;
  int _totalPages = 1;
  final int _limit = 20;

  CatalogueProvider({required CatalogueRepository repository}) : _repository = repository;

  List<Category> get categories => _categories;
  List<Brand> get brands => _brands;
  List<Product> get products => _products;
  List<Product> get featuredProducts => _featuredProducts;
  bool get isLoading => _isLoading;
  bool get isLoadingMore => _isLoadingMore;
  String? get errorMessage => _errorMessage;
  String? get selectedCategory => _selectedCategory;
  String? get selectedBrand => _selectedBrand;
  String? get selectedModel => _selectedModel;
  String get searchQuery => _searchQuery;
  int get currentPage => _currentPage;
  int get totalPages => _totalPages;
  bool get hasMore => _currentPage < _totalPages;

  Future<void> loadInitialData() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final fetchedCategories = await _repository.getCategories();
      final fetchedBrands = await _repository.getBrands();
      final paginated = await _repository.getProducts(limit: _limit);

      _categories = fetchedCategories;
      _brands = fetchedBrands;
      _products = paginated.products;
      _featuredProducts = paginated.products.where((p) => p.isFeatured).toList();
      _currentPage = paginated.page;
      _totalPages = paginated.totalPages;
    } catch (e) {
      _errorMessage = 'Failed to load catalogue. Pull down to refresh.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> searchProducts(String query) async {
    _searchQuery = query;
    _currentPage = 1;
    await _fetchProductsInternal(refresh: true);
  }

  Future<void> selectCategory(String? categorySlug) async {
    _selectedCategory = categorySlug;
    _currentPage = 1;
    await _fetchProductsInternal(refresh: true);
  }

  Future<void> selectBrand(String? brandSlug) async {
    _selectedBrand = brandSlug;
    _currentPage = 1;
    await _fetchProductsInternal(refresh: true);
  }

  Future<void> selectModel(String? modelSlug) async {
    _selectedModel = modelSlug;
    _currentPage = 1;
    await _fetchProductsInternal(refresh: true);
  }

  Future<void> clearFilters() async {
    _selectedCategory = null;
    _selectedBrand = null;
    _selectedModel = null;
    _searchQuery = '';
    _currentPage = 1;
    await _fetchProductsInternal(refresh: true);
  }

  Future<void> loadMore() async {
    if (_isLoadingMore || !hasMore) return;

    _isLoadingMore = true;
    notifyListeners();

    try {
      final nextPage = _currentPage + 1;
      final paginated = await _repository.getProducts(
        categorySlug: _selectedCategory,
        brandSlug: _selectedBrand,
        modelSlug: _selectedModel,
        search: _searchQuery,
        page: nextPage,
        limit: _limit,
      );

      _products.addAll(paginated.products);
      _currentPage = paginated.page;
      _totalPages = paginated.totalPages;
    } catch (_) {
      // Ignore load more errors silently or show snackbar
    } finally {
      _isLoadingMore = false;
      notifyListeners();
    }
  }

  Future<void> _fetchProductsInternal({bool refresh = false}) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final paginated = await _repository.getProducts(
        categorySlug: _selectedCategory,
        brandSlug: _selectedBrand,
        modelSlug: _selectedModel,
        search: _searchQuery,
        page: _currentPage,
        limit: _limit,
      );

      _products = paginated.products;
      _totalPages = paginated.totalPages;
      _currentPage = paginated.page;
    } catch (e) {
      _errorMessage = 'Could not retrieve products matching your filters.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
