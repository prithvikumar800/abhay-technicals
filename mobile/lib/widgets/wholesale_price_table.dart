import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants/app_colors.dart';
import '../models/wholesale_tier.dart';
import '../providers/auth_provider.dart';

class WholesalePriceTable extends StatelessWidget {
  final List<WholesaleTier> tiers;
  final double retailPrice;
  final double? salePrice;
  final int currentSelectedQuantity;

  const WholesalePriceTable({
    super.key,
    required this.tiers,
    required this.retailPrice,
    this.salePrice,
    this.currentSelectedQuantity = 1,
  });

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final isAuthorized = auth.isWholesaleAuthorized;

    if (tiers.isEmpty) {
      return const SizedBox.shrink();
    }

    if (!isAuthorized) {
      return Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.slate100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            const Icon(Icons.lock_outline, color: AppColors.secondary, size: 22),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Technician Wholesale Slabs Available',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 2),
                  const Text(
                    'Verify with WhatsApp OTP to unlock tiered bulk pricing for workshop repairs.',
                    style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 6),
                  InkWell(
                    onTap: () {
                      Navigator.of(context).pushNamed('/login');
                    },
                    child: const Text(
                      'Log in to view wholesale tiers →',
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

    // Sort tiers ascending by minQuantity
    final sortedTiers = List<WholesaleTier>.from(tiers)
      ..sort((a, b) => a.minQuantity.compareTo(b.minQuantity));

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.successBg,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.success.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.verified, color: AppColors.success, size: 18),
              SizedBox(width: 6),
              Text(
                'Wholesale Volume Slabs',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 13,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Table(
            border: TableBorder.all(
              color: AppColors.border,
              width: 1,
              borderRadius: BorderRadius.circular(4),
            ),
            columnWidths: const {
              0: FlexColumnWidth(2),
              1: FlexColumnWidth(2),
              2: FlexColumnWidth(2),
            },
            children: [
              const TableRow(
                decoration: BoxDecoration(color: Colors.white),
                children: [
                  Padding(
                    padding: EdgeInsets.all(6),
                    child: Text('Qty Range', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                  ),
                  Padding(
                    padding: EdgeInsets.all(6),
                    child: Text('Unit Price', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                  ),
                  Padding(
                    padding: EdgeInsets.all(6),
                    child: Text('Status', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                  ),
                ],
              ),
              ...sortedTiers.map((tier) {
                final isQualified = currentSelectedQuantity >= tier.minQuantity;
                return TableRow(
                  decoration: BoxDecoration(
                    color: isQualified ? AppColors.whatsappLight.withOpacity(0.3) : Colors.white,
                  ),
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(6),
                      child: Text(
                        '${tier.minQuantity}+ pcs',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: isQualified ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(6),
                      child: Text(
                        '₹${tier.unitPrice.toStringAsFixed(0)}/pc',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: isQualified ? AppColors.primary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(6),
                      child: Text(
                        isQualified ? 'Applied ✓' : 'Add ${tier.minQuantity - currentSelectedQuantity} more',
                        style: TextStyle(
                          fontSize: 10,
                          color: isQualified ? AppColors.success : AppColors.textMuted,
                          fontWeight: isQualified ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ],
          ),
        ],
      ),
    );
  }
}
