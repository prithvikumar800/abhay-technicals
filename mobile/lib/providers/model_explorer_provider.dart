import 'package:flutter/foundation.dart';
import '../models/brand.dart';
import '../models/device_model.dart';
import '../models/product.dart';
import '../repositories/catalogue_repository.dart';

enum ExplorerStep {
  selectBrand,
  selectModel,
  viewCompatibleParts;
}

class ModelExplorerProvider extends ChangeNotifier {
  final CatalogueRepository _repository;

  ExplorerStep _currentStep = ExplorerStep.selectBrand;
  List<Brand> _brands = [];
  Brand? _selectedBrand;
  List<DeviceModel> _models = [];
  DeviceModel? _selectedModel;
  List<Product> _compatibleParts = [];
  bool _isLoading = false;
  String? _errorMessage;

  ModelExplorerProvider({required CatalogueRepository repository}) : _repository = repository;

  ExplorerStep get currentStep => _currentStep;
  List<Brand> get brands => _brands;
  Brand? get selectedBrand => _selectedBrand;
  List<DeviceModel> get models => _models;
  DeviceModel? get selectedModel => _selectedModel;
  List<Product> get compatibleParts => _compatibleParts;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadBrands() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _brands = await _repository.getBrands();
    } catch (e) {
      _errorMessage = 'Failed to load handset brands.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> selectBrand(Brand brand) async {
    _selectedBrand = brand;
    _currentStep = ExplorerStep.selectModel;
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      if (brand.models.isNotEmpty) {
        _models = brand.models;
      } else {
        _models = await _repository.getModelsByBrand(brand.id);
      }
    } catch (e) {
      _errorMessage = 'Failed to load models for ${brand.name}.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> selectModel(DeviceModel model) async {
    _selectedModel = model;
    _currentStep = ExplorerStep.viewCompatibleParts;
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final result = await _repository.getProducts(
        modelSlug: model.name,
        limit: 50,
      );
      _compatibleParts = result.products;
    } catch (e) {
      _errorMessage = 'Failed to load compatible parts for ${model.name}.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void resetToBrands() {
    _selectedBrand = null;
    _selectedModel = null;
    _compatibleParts = [];
    _currentStep = ExplorerStep.selectBrand;
    notifyListeners();
  }

  void backToModels() {
    _selectedModel = null;
    _compatibleParts = [];
    _currentStep = ExplorerStep.selectModel;
    notifyListeners();
  }
}
