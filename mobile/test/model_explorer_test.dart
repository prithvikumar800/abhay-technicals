import 'package:flutter_test/flutter_test.dart';
import 'test_helper.dart';
import 'package:abhay_technicals/providers/model_explorer_provider.dart';
import 'package:abhay_technicals/repositories/catalogue_repository.dart';

void main() {
  group('Model Explorer 3-Step Flow Tests', () {
    late CatalogueRepository repository;
    late ModelExplorerProvider provider;

    setUp(() {
      final client = createMockApiClient();
      repository = CatalogueRepository(apiClient: client);
      provider = ModelExplorerProvider(repository: repository);
    });

    test('1. Initial step is selectBrand', () {
      expect(provider.currentStep, ExplorerStep.selectBrand);
      expect(provider.selectedBrand, null);
      expect(provider.selectedModel, null);
      expect(provider.compatibleParts.isEmpty, true);
    });

    test('2. Loading brands populates handset manufacturers', () async {
      await provider.loadBrands();
      expect(provider.brands.isNotEmpty, true);
      expect(provider.brands.any((b) => b.name == 'Vivo'), true);
    });

    test('3. Selecting brand loads models and advances step to selectModel', () async {
      await provider.loadBrands();
      final vivo = provider.brands.firstWhere((b) => b.name == 'Vivo');

      await provider.selectBrand(vivo);

      expect(provider.currentStep, ExplorerStep.selectModel);
      expect(provider.selectedBrand?.name, 'Vivo');
      expect(provider.models.isNotEmpty, true);
      expect(provider.models.any((m) => m.name.contains('Y11')), true);
    });

    test('4. Selecting model loads compatible parts and advances to viewCompatibleParts', () async {
      await provider.loadBrands();
      final vivo = provider.brands.firstWhere((b) => b.name == 'Vivo');
      await provider.selectBrand(vivo);

      final y11 = provider.models.firstWhere((m) => m.name.contains('Y11'));
      await provider.selectModel(y11);

      expect(provider.currentStep, ExplorerStep.viewCompatibleParts);
      expect(provider.selectedModel?.name, contains('Y11'));
      expect(provider.compatibleParts.isNotEmpty, true);

      // Verify returned parts are compatible with Vivo Y11
      for (final part in provider.compatibleParts) {
        final matches = part.compatibility.toLowerCase().contains('y11') ||
            part.compatibleModels.any((m) => m.toLowerCase().contains('y11'));
        expect(matches, true);
      }
    });

    test('5. Breadcrumb navigation transitions steps correctly', () async {
      await provider.loadBrands();
      final vivo = provider.brands.firstWhere((b) => b.name == 'Vivo');
      await provider.selectBrand(vivo);
      final y11 = provider.models.firstWhere((m) => m.name.contains('Y11'));
      await provider.selectModel(y11);

      expect(provider.currentStep, ExplorerStep.viewCompatibleParts);

      // Back to models
      provider.backToModels();
      expect(provider.currentStep, ExplorerStep.selectModel);
      expect(provider.selectedModel, null);

      // Reset to brands
      provider.resetToBrands();
      expect(provider.currentStep, ExplorerStep.selectBrand);
      expect(provider.selectedBrand, null);
    });
  });
}
