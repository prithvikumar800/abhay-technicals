import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../providers/model_explorer_provider.dart';
import '../../../widgets/common_header.dart';
import '../../../widgets/product_card.dart';

class ModelExplorerScreen extends StatefulWidget {
  const ModelExplorerScreen({super.key});

  @override
  State<ModelExplorerScreen> createState() => _ModelExplorerScreenState();
}

class _ModelExplorerScreenState extends State<ModelExplorerScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final explorer = context.read<ModelExplorerProvider>();
      if (explorer.brands.isEmpty) {
        explorer.loadBrands();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final explorer = context.watch<ModelExplorerProvider>();

    return Scaffold(
      appBar: CommonHeader(
        title: 'Model Explorer',
        showBackButton: explorer.currentStep != ExplorerStep.selectBrand,
      ),
      body: Column(
        children: [
          // Step Breadcrumbs Header
          _buildBreadcrumbs(explorer),

          // Main Step Content
          Expanded(
            child: explorer.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                : _buildStepContent(explorer),
          ),
        ],
      ),
    );
  }

  Widget _buildBreadcrumbs(ModelExplorerProvider explorer) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          // Step 1: Brand
          InkWell(
            onTap: explorer.currentStep != ExplorerStep.selectBrand
                ? () => explorer.resetToBrands()
                : null,
            child: Row(
              children: [
                Icon(
                  Icons.phone_android,
                  size: 16,
                  color: explorer.selectedBrand != null ? AppColors.secondary : AppColors.primary,
                ),
                const SizedBox(width: 4),
                Text(
                  explorer.selectedBrand?.name ?? '1. Brand',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: explorer.selectedBrand != null ? AppColors.secondary : AppColors.primary,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          const Icon(Icons.chevron_right, size: 16, color: AppColors.slate400),
          const SizedBox(width: 8),

          // Step 2: Model
          InkWell(
            onTap: explorer.currentStep == ExplorerStep.viewCompatibleParts
                ? () => explorer.backToModels()
                : null,
            child: Text(
              explorer.selectedModel?.name ?? '2. Handset Model',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: explorer.currentStep == ExplorerStep.selectModel
                    ? AppColors.primary
                    : (explorer.selectedModel != null ? AppColors.secondary : AppColors.slate400),
              ),
            ),
          ),
          const SizedBox(width: 8),
          const Icon(Icons.chevron_right, size: 16, color: AppColors.slate400),
          const SizedBox(width: 8),

          // Step 3: Parts
          Text(
            '3. Parts',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: explorer.currentStep == ExplorerStep.viewCompatibleParts
                  ? AppColors.primary
                  : AppColors.slate400,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepContent(ModelExplorerProvider explorer) {
    switch (explorer.currentStep) {
      case ExplorerStep.selectBrand:
        return _buildBrandSelection(explorer);
      case ExplorerStep.selectModel:
        return _buildModelSelection(explorer);
      case ExplorerStep.viewCompatibleParts:
        return _buildCompatiblePartsView(explorer);
    }
  }

  Widget _buildBrandSelection(ModelExplorerProvider explorer) {
    final brands = explorer.brands;
    return ListView(
      padding: const EdgeInsets.all(12),
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(vertical: 8),
          child: Text(
            'Select Smartphone Brand',
            style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
          ),
        ),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 2.2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: brands.length,
          itemBuilder: (context, index) {
            final brand = brands[index];
            return InkWell(
              onTap: () => explorer.selectBrand(brand),
              borderRadius: BorderRadius.circular(8),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppColors.slate100,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Icon(Icons.smartphone, color: AppColors.primary, size: 22),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            brand.name,
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            '${brand.models.isNotEmpty ? brand.models.length : 12}+ models',
                            style: const TextStyle(color: AppColors.textMuted, fontSize: 10),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildModelSelection(ModelExplorerProvider explorer) {
    final models = explorer.models;
    return ListView(
      padding: const EdgeInsets.all(12),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Models for ${explorer.selectedBrand?.name}',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            TextButton.icon(
              onPressed: () => explorer.resetToBrands(),
              icon: const Icon(Icons.arrow_back, size: 14),
              label: const Text('Change Brand', style: TextStyle(fontSize: 12)),
            ),
          ],
        ),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: models.length,
          separatorBuilder: (_, __) => const SizedBox(height: 8),
          itemBuilder: (context, index) {
            final model = models[index];
            return Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
                side: const BorderSide(color: AppColors.border),
              ),
              child: ListTile(
                leading: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.infoBg,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: const Icon(Icons.build, color: AppColors.secondary, size: 20),
                ),
                title: Text(
                  model.name,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                subtitle: Text(
                  '${model.partCount > 0 ? model.partCount : 15} compatible spares in stock',
                  style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                ),
                trailing: const Icon(Icons.chevron_right, color: AppColors.slate400),
                onTap: () => explorer.selectModel(model),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildCompatiblePartsView(ModelExplorerProvider explorer) {
    final parts = explorer.compatibleParts;

    return Column(
      children: [
        // Handset compatibility badge bar
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          color: AppColors.infoBg,
          child: Row(
            children: [
              const Icon(Icons.verified, color: AppColors.secondary, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Showing parts strictly compatible with ${explorer.selectedModel?.name}',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.secondaryDark,
                  ),
                ),
              ),
              InkWell(
                onTap: () => explorer.backToModels(),
                child: const Text(
                  'Change',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),

        // Product Grid
        Expanded(
          child: parts.isEmpty
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search_off, size: 48, color: AppColors.slate400),
                        const SizedBox(height: 12),
                        Text(
                          'No direct parts found for ${explorer.selectedModel?.name}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Contact our team via WhatsApp to enquire about unlisted parts.',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                        ),
                      ],
                    ),
                  ),
                )
              : GridView.builder(
                  padding: const EdgeInsets.all(10),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.62,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                  ),
                  itemCount: parts.length,
                  itemBuilder: (context, index) {
                    return ProductCard(product: parts[index]);
                  },
                ),
        ),
      ],
    );
  }
}
