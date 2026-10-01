import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/cart_item.dart';
import '../../../providers/auth_provider.dart';
import '../../../providers/cart_provider.dart';
import '../../../widgets/common_header.dart';
import '../../../widgets/quantity_stepper.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    final auth = context.watch<AuthProvider>();
    final isWholesale = auth.isWholesaleAuthorized;

    return Scaffold(
      appBar: const CommonHeader(
        title: 'Shopping Cart',
        showBackButton: true,
        showCartAction: false,
      ),
      body: cart.isEmpty
          ? _buildEmptyCart(context)
          : Column(
              children: [
                // Free shipping progress bar
                _buildShippingProgress(cart),

                // Cart item list
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.all(12),
                    itemCount: cart.items.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final item = cart.items[index];
                      return _buildCartItemCard(context, item, cart, isWholesale);
                    },
                  ),
                ),

                // Bottom summary checkout bar
                _buildCheckoutBar(context, cart, auth),
              ],
            ),
    );
  }

  Widget _buildEmptyCart(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: AppColors.slate100,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.remove_shopping_cart_outlined, size: 56, color: AppColors.slate400),
            ),
            const SizedBox(height: 16),
            const Text(
              'Your Spare Parts Cart is Empty',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
            ),
            const SizedBox(height: 6),
            const Text(
              'Search for batteries, charging flex, back panels, or use the Model Explorer.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                minimumSize: const Size(180, 44),
              ),
              onPressed: () {
                Navigator.of(context).pushReplacementNamed('/catalogue');
              },
              child: const Text('Start Exploring Parts'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildShippingProgress(CartProvider cart) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: cart.isEligibleForFreeShipping ? AppColors.whatsappLight.withOpacity(0.3) : AppColors.infoBg,
      child: Row(
        children: [
          Icon(
            cart.isEligibleForFreeShipping ? Icons.check_circle : Icons.local_shipping,
            size: 18,
            color: cart.isEligibleForFreeShipping ? AppColors.whatsappDark : AppColors.secondary,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              cart.isEligibleForFreeShipping
                  ? 'Congratulations! You qualify for FREE All-India Shipping.'
                  : 'Add ₹${cart.freeShippingShortfall.toStringAsFixed(0)} more for FREE Delhivery Shipping.',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: cart.isEligibleForFreeShipping ? AppColors.whatsappDark : AppColors.secondaryDark,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCartItemCard(
    BuildContext context,
    CartItem item,
    CartProvider cart,
    bool isWholesale,
  ) {
    return Card(
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: AppColors.border),
      ),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Thumbnail
            Container(
              width: 70,
              height: 70,
              decoration: BoxDecoration(
                color: AppColors.slate100,
                borderRadius: BorderRadius.circular(6),
              ),
              child: item.productImage != null
                  ? Image.network(
                      item.productImage!,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => const Icon(Icons.devices, color: AppColors.slate400),
                    )
                  : const Icon(Icons.devices, color: AppColors.slate400),
            ),
            const SizedBox(width: 10),

            // Item Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (item.compatibility.isNotEmpty)
                    Text(
                      item.compatibility,
                      style: const TextStyle(fontSize: 10, color: AppColors.secondary, fontWeight: FontWeight.bold),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  Text(
                    item.productName,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    'SKU: ${item.productSku}',
                    style: const TextStyle(fontSize: 10, color: AppColors.textMuted),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '₹${item.unitPrice.toStringAsFixed(0)} / pc',
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primary),
                          ),
                          Text(
                            'Total: ₹${item.totalPrice.toStringAsFixed(0)}',
                            style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                          ),
                        ],
                      ),
                      QuantityStepper(
                        value: item.quantity,
                        min: item.moq,
                        max: item.maxStock,
                        onChanged: (newQty) {
                          cart.updateQuantity(item.id, newQty, isWholesale: isWholesale);
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Remove Button
            IconButton(
              icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.slate400),
              onPressed: () => cart.removeItem(item.id),
              tooltip: 'Remove',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCheckoutBar(BuildContext context, CartProvider cart, AuthProvider auth) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: AppColors.border)),
        boxShadow: [
          BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, -2)),
        ],
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Subtotal:', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                Text('₹${cart.subtotal.toStringAsFixed(2)}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Delhivery Shipping:', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                Text(
                  cart.shippingFee == 0 ? 'FREE' : '₹${cart.shippingFee.toStringAsFixed(2)}',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: cart.shippingFee == 0 ? AppColors.success : AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            const Divider(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Grand Total:', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                Text(
                  '₹${cart.total.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 18,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                minimumSize: const Size.fromHeight(48),
              ),
              onPressed: () {
                if (!auth.isAuthenticated) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Please sign in with mobile OTP to checkout.')),
                  );
                  Navigator.of(context).pushNamed('/login');
                } else {
                  Navigator.of(context).pushNamed('/checkout');
                }
              },
              child: const Text('PROCEED TO CHECKOUT →', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            ),
          ],
        ),
      ),
    );
  }
}
