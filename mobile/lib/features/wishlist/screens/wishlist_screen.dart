import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/product.dart';
import '../../../providers/cart_provider.dart';
import '../../../widgets/common_header.dart';

class WishlistScreen extends StatefulWidget {
  const WishlistScreen({super.key});

  @override
  State<WishlistScreen> createState() => _WishlistScreenState();
}

class _WishlistScreenState extends State<WishlistScreen> {
  // Mobile client-side saved items foundation
  final List<Product> _savedItems = [];

  @override
  Widget build(BuildContext context) {
    final cart = context.read<CartProvider>();

    return Scaffold(
      appBar: const CommonHeader(
        title: 'Saved Workshop Spares',
        showBackButton: true,
      ),
      body: _savedItems.isEmpty
          ? Center(
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
                      child: const Icon(Icons.bookmark_outline, size: 52, color: AppColors.slate400),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'No Spares Saved',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Bookmark commonly ordered handset parts, batteries, or flex cables for quick re-ordering.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(12),
              itemCount: _savedItems.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final product = _savedItems[index];
                return Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: const BorderSide(color: AppColors.border),
                  ),
                  child: ListTile(
                    leading: Container(
                      width: 50,
                      height: 50,
                      color: AppColors.slate100,
                      child: const Icon(Icons.devices, color: AppColors.slate400),
                    ),
                    title: Text(product.name, maxLines: 1, overflow: TextOverflow.ellipsis),
                    subtitle: Text('SKU: ${product.sku} • ₹${product.effectivePrice.toStringAsFixed(0)}'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.add_shopping_cart, color: AppColors.primary),
                          onPressed: () {
                            cart.addToCart(product, quantity: product.moq);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Added ${product.name} to cart')),
                            );
                          },
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: AppColors.slate400),
                          onPressed: () {
                            setState(() {
                              _savedItems.removeAt(index);
                            });
                          },
                        ),
                      ],
                    ),
                    onTap: () {
                      Navigator.of(context).pushNamed('/product-detail', arguments: product);
                    },
                  ),
                );
              },
            ),
    );
  }
}
