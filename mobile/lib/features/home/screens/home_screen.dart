import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/product.dart';
import '../../../providers/auth_provider.dart';
import '../../../providers/catalogue_provider.dart';
import '../../../services/whatsapp_service.dart';
import '../../../widgets/common_header.dart';
import '../../../widgets/product_card.dart';
import '../../../widgets/skeleton_loader.dart';

class HomeScreen extends StatelessWidget {
  final Function(int)? onNavigateTab;

  const HomeScreen({super.key, this.onNavigateTab});

  @override
  Widget build(BuildContext context) {
    final catalogue = context.watch<CatalogueProvider>();
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: const CommonHeader(),
      body: RefreshIndicator(
        onRefresh: () => catalogue.loadInitialData(),
        color: AppColors.primary,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Search Bar Header
              _buildSearchBar(context),

              // 2. Technician Handset Part Finder Quick Banner
              _buildPartFinderBanner(context),

              // 3. Category Horizontal Pills
              _buildCategoryShortcuts(context, catalogue),

              // 4. Popular Smartphone Brands
              _buildBrandShortcuts(context, catalogue),

              // 5. Wholesale Pricing Value Banner (Login-gated CTA)
              _buildWholesaleCta(context, auth),

              // 6. Featured Spare Parts Grid
              _buildProductSection(
                context,
                title: 'Featured Spare Parts',
                subtitle: 'High-reliability workshop replacement components',
                products: catalogue.featuredProducts,
                isLoading: catalogue.isLoading,
                onSeeAll: () {
                  onNavigateTab?.call(1);
                },
              ),

              // 7. WhatsApp Quick Order & Technical Enquiry CTA
              _buildWhatsAppCta(context),

              // 8. New Arrivals Section
              _buildProductSection(
                context,
                title: 'New Arrivals',
                subtitle: 'Latest compatible parts added to catalogue',
                products: catalogue.products.where((p) => p.isNew).toList(),
                isLoading: catalogue.isLoading,
                onSeeAll: () {
                  onNavigateTab?.call(1);
                },
              ),

              // 9. Shipping & Operational Policy Notice
              _buildPolicyNotice(),

              // 10. Repair Guides & Diagnostic Tips Entry
              _buildRepairGuideEntry(context),

              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSearchBar(BuildContext context) {
    return Container(
      color: AppColors.primary,
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
      child: InkWell(
        onTap: () {
          Navigator.of(context).pushNamed('/catalogue', arguments: {'focusSearch': true});
        },
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Row(
            children: [
              Icon(Icons.search, color: AppColors.slate400, size: 22),
              SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Search part name, SKU (e.g. BAT-VIV-Y11), or handset...',
                  style: TextStyle(
                    color: AppColors.textMuted,
                    fontSize: 13,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPartFinderBanner(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppColors.primaryDark, AppColors.primary],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.12),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.build_circle, color: AppColors.secondaryLight, size: 32),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Handset Model Explorer',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 2),
                const Text(
                  'Select Brand → Model → All Compatible Parts in 3 taps',
                  style: TextStyle(color: AppColors.slate300, fontSize: 11),
                ),
                const SizedBox(height: 8),
                InkWell(
                  onTap: () => onNavigateTab?.call(2),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: AppColors.secondary,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'Open Model Explorer →',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryShortcuts(BuildContext context, CatalogueProvider catalogue) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Browse by Category',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
              InkWell(
                onTap: () => onNavigateTab?.call(1),
                child: const Text(
                  'All Categories →',
                  style: TextStyle(color: AppColors.secondary, fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 96,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            itemCount: catalogue.categories.length,
            itemBuilder: (context, index) {
              final cat = catalogue.categories[index];
              return Container(
                width: 100,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                child: InkWell(
                  onTap: () {
                    catalogue.selectCategory(cat.name);
                    onNavigateTab?.call(1);
                  },
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.inventory_2_outlined, color: AppColors.primary, size: 28),
                        const SizedBox(height: 6),
                        Text(
                          cat.name,
                          textAlign: TextAlign.center,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildBrandShortcuts(BuildContext context, CatalogueProvider catalogue) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Text(
            'Supported Brands',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        SizedBox(
          height: 44,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            itemCount: catalogue.brands.length,
            itemBuilder: (context, index) {
              final brand = catalogue.brands[index];
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: ActionChip(
                  label: Text(brand.name),
                  labelStyle: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.primary,
                  ),
                  backgroundColor: Colors.white,
                  side: const BorderSide(color: AppColors.border),
                  onPressed: () {
                    catalogue.selectBrand(brand.name);
                    onNavigateTab?.call(1);
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildWholesaleCta(BuildContext context, AuthProvider auth) {
    if (auth.isWholesaleAuthorized) {
      return Container(
        margin: const EdgeInsets.all(12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.whatsappLight.withOpacity(0.4),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppColors.whatsapp),
        ),
        child: const Row(
          children: [
            Icon(Icons.verified, color: AppColors.whatsappDark, size: 24),
            SizedBox(width: 10),
            Expanded(
              child: Text(
                'Wholesale pricing active. Quantity discount slabs automatically applied.',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.slate800),
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      margin: const EdgeInsets.all(12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.slate100,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          const Icon(Icons.groups, color: AppColors.secondary, size: 28),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Workshop Wholesale Purchasing',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: AppColors.textPrimary),
                ),
                const SizedBox(height: 2),
                const Text(
                  'Sign in with your mobile number to unlock tiered bulk pricing (OTP sent via WhatsApp).',
                  style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 6),
                InkWell(
                  onTap: () {
                    Navigator.of(context).pushNamed('/login');
                  },
                  child: const Text(
                    'Sign In with Mobile OTP →',
                    style: TextStyle(
                      color: AppColors.secondary,
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProductSection(
    BuildContext context, {
    required String title,
    required String subtitle,
    required List<Product> products,
    required bool isLoading,
    required VoidCallback onSeeAll,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                  ),
                ],
              ),
              InkWell(
                onTap: onSeeAll,
                child: const Text(
                  'View All →',
                  style: TextStyle(color: AppColors.secondary, fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ),
        if (isLoading)
          SizedBox(
            height: 230,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: 3,
              itemBuilder: (_, __) => Container(
                width: 170,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                child: const SkeletonLoader(width: 170, height: 230),
              ),
            ),
          )
        else
          SizedBox(
            height: 240,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: products.length,
              itemBuilder: (context, index) {
                final prod = products[index];
                return SizedBox(
                  width: 175,
                  child: ProductCard(product: prod),
                );
              },
            ),
          ),
      ],
    );
  }

  Widget _buildWhatsAppCta(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.whatsappDark,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          const Icon(Icons.chat, color: Colors.white, size: 28),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Need an Unlisted Handset Part?',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 14,
                  ),
                ),
                Text(
                  'Chat with our sourcing team on WhatsApp with photos or model number.',
                  style: TextStyle(color: Colors.white70, fontSize: 11),
                ),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: AppColors.whatsappDark,
              minimumSize: const Size(80, 36),
              padding: const EdgeInsets.symmetric(horizontal: 12),
            ),
            onPressed: () {
              WhatsAppService().launchGeneralSupport();
            },
            child: const Text('Enquire', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12)),
          ),
        ],
      ),
    );
  }

  Widget _buildPolicyNotice() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border),
      ),
      child: const Row(
        children: [
          Icon(Icons.local_shipping_outlined, color: AppColors.primary, size: 24),
          SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'All India Delhivery Logistics',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
                ),
                Text(
                  'Real-time tracking, tamper-proof packaging, testing warranty on technician parts.',
                  style: TextStyle(fontSize: 10, color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRepairGuideEntry(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border),
      ),
      child: const Row(
        children: [
          Icon(Icons.menu_book, color: AppColors.secondary, size: 24),
          SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Technician Knowledge Base',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
                ),
                Text(
                  'Battery health diagnostics, OCA lamination settings, flex pinouts.',
                  style: TextStyle(fontSize: 10, color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
          Icon(Icons.arrow_forward_ios, size: 14, color: AppColors.slate400),
        ],
      ),
    );
  }
}
