import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../providers/catalogue_provider.dart';
import '../../../widgets/common_header.dart';
import '../../../widgets/product_card.dart';
import '../../../widgets/skeleton_loader.dart';

class CatalogueScreen extends StatefulWidget {
  final bool focusSearch;

  const CatalogueScreen({super.key, this.focusSearch = false});

  @override
  State<CatalogueScreen> createState() => _CatalogueScreenState();
}

class _CatalogueScreenState extends State<CatalogueScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final FocusNode _searchFocusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    if (widget.focusSearch) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _searchFocusNode.requestFocus();
      });
    }
  }

  void _onScroll() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 200) {
      context.read<CatalogueProvider>().loadMore();
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    _searchFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final catalogue = context.watch<CatalogueProvider>();

    return Scaffold(
      appBar: const CommonHeader(title: 'Catalogue'),
      body: Column(
        children: [
          // Search & Filter Header
          _buildSearchAndFilters(catalogue),

          // Active Filter Chips
          if (catalogue.selectedCategory != null ||
              catalogue.selectedBrand != null ||
              catalogue.searchQuery.isNotEmpty)
            _buildActiveFilterChips(catalogue),

          // Main Product Listing Grid
          Expanded(
            child: catalogue.isLoading
                ? _buildLoadingGrid()
                : catalogue.products.isEmpty
                    ? _buildEmptyState(catalogue)
                    : RefreshIndicator(
                        onRefresh: () => catalogue.loadInitialData(),
                        color: AppColors.primary,
                        child: GridView.builder(
                          controller: _scrollController,
                          padding: const EdgeInsets.all(8),
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 0.62,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8,
                          ),
                          itemCount: catalogue.products.length + (catalogue.isLoadingMore ? 2 : 0),
                          itemBuilder: (context, index) {
                            if (index >= catalogue.products.length) {
                              return const SkeletonLoader(width: 170, height: 230);
                            }
                            return ProductCard(product: catalogue.products[index]);
                          },
                        ),
                      ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilters(CatalogueProvider catalogue) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Column(
        children: [
          // Search field
          TextField(
            controller: _searchController,
            focusNode: _searchFocusNode,
            decoration: InputDecoration(
              hintText: 'Search SKU (BAT-VIV-Y11), Part, Handset...',
              prefixIcon: const Icon(Icons.search, color: AppColors.slate400),
              suffixIcon: _searchController.text.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear, size: 18),
                      onPressed: () {
                        _searchController.clear();
                        catalogue.searchProducts('');
                      },
                    )
                  : null,
              contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            ),
            onSubmitted: (query) {
              catalogue.searchProducts(query);
            },
          ),
          const SizedBox(height: 8),

          // Filter shortcuts row
          SizedBox(
            height: 36,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildFilterDropdown(
                  title: catalogue.selectedCategory ?? 'Category',
                  isSelected: catalogue.selectedCategory != null,
                  onTap: () => _showCategoryModal(context, catalogue),
                ),
                const SizedBox(width: 8),
                _buildFilterDropdown(
                  title: catalogue.selectedBrand ?? 'Brand',
                  isSelected: catalogue.selectedBrand != null,
                  onTap: () => _showBrandModal(context, catalogue),
                ),
                const SizedBox(width: 8),
                if (catalogue.selectedCategory != null ||
                    catalogue.selectedBrand != null ||
                    catalogue.searchQuery.isNotEmpty)
                  ActionChip(
                    label: const Text('Reset All'),
                    labelStyle: const TextStyle(fontSize: 11, color: AppColors.error),
                    backgroundColor: AppColors.errorBg,
                    side: const BorderSide(color: AppColors.error),
                    onPressed: () {
                      _searchController.clear();
                      catalogue.clearFilters();
                    },
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterDropdown({
    required String title,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(6),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.infoBg : Colors.white,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(
            color: isSelected ? AppColors.secondary : AppColors.border,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                color: isSelected ? AppColors.secondaryDark : AppColors.textPrimary,
              ),
            ),
            const SizedBox(width: 4),
            Icon(
              Icons.keyboard_arrow_down,
              size: 16,
              color: isSelected ? AppColors.secondaryDark : AppColors.slate400,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveFilterChips(CatalogueProvider catalogue) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      color: AppColors.slate100,
      child: Row(
        children: [
          const Text('Active Filters: ', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  if (catalogue.searchQuery.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: Chip(
                        label: Text('Query: "${catalogue.searchQuery}"'),
                        labelStyle: const TextStyle(fontSize: 10),
                        deleteIcon: const Icon(Icons.close, size: 12),
                        onDeleted: () {
                          _searchController.clear();
                          catalogue.searchProducts('');
                        },
                      ),
                    ),
                  if (catalogue.selectedCategory != null)
                    Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: Chip(
                        label: Text(catalogue.selectedCategory!),
                        labelStyle: const TextStyle(fontSize: 10),
                        deleteIcon: const Icon(Icons.close, size: 12),
                        onDeleted: () => catalogue.selectCategory(null),
                      ),
                    ),
                  if (catalogue.selectedBrand != null)
                    Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: Chip(
                        label: Text(catalogue.selectedBrand!),
                        labelStyle: const TextStyle(fontSize: 10),
                        deleteIcon: const Icon(Icons.close, size: 12),
                        onDeleted: () => catalogue.selectBrand(null),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingGrid() {
    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.62,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: 6,
      itemBuilder: (_, __) => const SkeletonLoader(width: 170, height: 230),
    );
  }

  Widget _buildEmptyState(CatalogueProvider catalogue) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.inventory_2_outlined, size: 56, color: AppColors.slate400),
            const SizedBox(height: 16),
            const Text(
              'No spare parts found',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 6),
            const Text(
              'Try searching with a broader keyword, SKU, or clear applied category filters.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(minimumSize: const Size(140, 40)),
              onPressed: () {
                _searchController.clear();
                catalogue.clearFilters();
              },
              child: const Text('Reset Filters'),
            ),
          ],
        ),
      ),
    );
  }

  void _showCategoryModal(BuildContext context, CatalogueProvider catalogue) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.all(16),
          children: [
            const Text('Select Category', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const Divider(),
            ListTile(
              title: const Text('All Categories'),
              trailing: catalogue.selectedCategory == null ? const Icon(Icons.check, color: AppColors.primary) : null,
              onTap: () {
                catalogue.selectCategory(null);
                Navigator.pop(ctx);
              },
            ),
            ...catalogue.categories.map((c) => ListTile(
                  title: Text(c.name),
                  trailing: catalogue.selectedCategory == c.name ? const Icon(Icons.check, color: AppColors.primary) : null,
                  onTap: () {
                    catalogue.selectCategory(c.name);
                    Navigator.pop(ctx);
                  },
                )),
          ],
        );
      },
    );
  }

  void _showBrandModal(BuildContext context, CatalogueProvider catalogue) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.all(16),
          children: [
            const Text('Select Brand', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const Divider(),
            ListTile(
              title: const Text('All Brands'),
              trailing: catalogue.selectedBrand == null ? const Icon(Icons.check, color: AppColors.primary) : null,
              onTap: () {
                catalogue.selectBrand(null);
                Navigator.pop(ctx);
              },
            ),
            ...catalogue.brands.map((b) => ListTile(
                  title: Text(b.name),
                  trailing: catalogue.selectedBrand == b.name ? const Icon(Icons.check, color: AppColors.primary) : null,
                  onTap: () {
                    catalogue.selectBrand(b.name);
                    Navigator.pop(ctx);
                  },
                )),
          ],
        );
      },
    );
  }
}
