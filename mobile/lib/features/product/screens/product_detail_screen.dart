import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/product.dart';
import '../../../providers/auth_provider.dart';
import '../../../providers/cart_provider.dart';
import '../../../providers/catalogue_provider.dart';
import '../../../services/whatsapp_service.dart';
import '../../../widgets/common_header.dart';
import '../../../widgets/product_card.dart';
import '../../../widgets/quantity_stepper.dart';
import '../../../widgets/wholesale_price_table.dart';

class ProductDetailScreen extends StatefulWidget {
  final Product product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  late int _selectedQuantity;

  @override
  void initState() {
    super.initState();
    _selectedQuantity = widget.product.moq;
  }

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    final auth = context.watch<AuthProvider>();
    final cart = context.watch<CartProvider>();
    final catalogue = context.watch<CatalogueProvider>();
    final isWholesale = auth.isWholesaleAuthorized;

    final unitPrice = product.getUnitPriceForQuantity(
      _selectedQuantity,
      isWholesaleAuthorized: isWholesale,
    );
    final totalPrice = unitPrice * _selectedQuantity;

    final relatedProducts = catalogue.products
        .where((p) => p.id != product.id && (p.category == product.category || p.brand == product.brand))
        .take(4)
        .toList();

    return Scaffold(
      appBar: CommonHeader(
        title: product.sku,
        showBackButton: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. Image Gallery
            _buildImageGallery(product),

            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // 2. High-Visibility Compatibility Badge
                  if (product.compatibility.isNotEmpty)
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      margin: const EdgeInsets.only(bottom: 12),
                      decoration: BoxDecoration(
                        color: AppColors.infoBg,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.secondary.withOpacity(0.5)),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle, color: AppColors.secondary, size: 20),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              product.compatibility,
                              style: const TextStyle(
                                color: AppColors.secondaryDark,
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                  // 3. Product Name & SKU
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.slate100,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: AppColors.border),
                        ),
                        child: Text(
                          'SKU: ${product.sku}',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      if (product.brand != null)
                        Text(
                          'Brand: ${product.brand}',
                          style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                        ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // 4. Pricing Block
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        '₹${unitPrice.toStringAsFixed(0)}',
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(width: 6),
                      const Text('/ piece', style: TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                      if (product.salePrice != null && !isWholesale) ...[
                        const SizedBox(width: 10),
                        Text(
                          '₹${product.retailPrice.toStringAsFixed(0)}',
                          style: const TextStyle(
                            fontSize: 15,
                            color: AppColors.textMuted,
                            decoration: TextDecoration.lineThrough,
                          ),
                        ),
                      ],
                    ],
                  ),

                  // Stock & MOQ Information Pill
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: product.isOutOfStock ? AppColors.errorBg : AppColors.successBg,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          product.isOutOfStock ? 'Out of Stock' : 'In Stock (${product.stock} units)',
                          style: TextStyle(
                            color: product.isOutOfStock ? AppColors.error : AppColors.success,
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      if (product.moq > 1) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.slate100,
                            borderRadius: BorderRadius.circular(4),
                            border: Border.all(color: AppColors.border),
                          ),
                          child: Text(
                            'Min Order Qty: ${product.moq} pcs',
                            style: const TextStyle(
                              color: AppColors.textPrimary,
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),

                  // 5. Wholesale Price Tiers Table
                  WholesalePriceTable(
                    tiers: product.wholesaleTiers,
                    retailPrice: product.retailPrice,
                    salePrice: product.salePrice,
                    currentSelectedQuantity: _selectedQuantity,
                  ),

                  const Divider(height: 28),

                  // 6. Quantity Selection & Add to Cart
                  if (!product.isOutOfStock) ...[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Select Quantity',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                            ),
                            if (product.moq > 1)
                              Text(
                                'Must be ≥ ${product.moq} pcs',
                                style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                              ),
                          ],
                        ),
                        QuantityStepper(
                          value: _selectedQuantity,
                          min: product.moq,
                          max: product.stock > 0 ? product.stock : 999,
                          onChanged: (newQty) {
                            setState(() {
                              _selectedQuantity = newQty;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Add to Cart Primary Button
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        minimumSize: const Size.fromHeight(50),
                      ),
                      onPressed: () async {
                        final success = await cart.addToCart(
                          product,
                          quantity: _selectedQuantity,
                          isWholesale: isWholesale,
                        );
                        if (mounted && success) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Added $_selectedQuantity x ${product.name} to cart!'),
                              action: SnackBarAction(
                                label: 'GO TO CART',
                                textColor: AppColors.secondaryLight,
                                onPressed: () {
                                  Navigator.of(context).pushNamed('/cart');
                                },
                              ),
                            ),
                          );
                        }
                      },
                      icon: const Icon(Icons.add_shopping_cart, size: 20),
                      label: Text(
                        'ADD TO CART • ₹${totalPrice.toStringAsFixed(0)}',
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(height: 10),
                  ],

                  // 7. Direct WhatsApp Enquiry CTA
                  OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.whatsappDark,
                      side: const BorderSide(color: AppColors.whatsapp, width: 1.5),
                      minimumSize: const Size.fromHeight(48),
                    ),
                    onPressed: () {
                      WhatsAppService().launchProductEnquiry(product);
                    },
                    icon: const Icon(Icons.chat, color: AppColors.whatsappDark),
                    label: const Text(
                      'Enquire on WhatsApp with SKU',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),

                  const Divider(height: 32),

                  // 8. Description
                  if (product.description != null && product.description!.isNotEmpty) ...[
                    const Text(
                      'Component Description',
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      product.description!,
                      style: const TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.4),
                    ),
                    const SizedBox(height: 20),
                  ],

                  // 9. Technical Specifications
                  if (product.specifications.isNotEmpty) ...[
                    const Text(
                      'Technical Specifications',
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Column(
                        children: product.specifications.entries.map((entry) {
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: const BoxDecoration(
                              border: Border(bottom: BorderSide(color: AppColors.border)),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  flex: 4,
                                  child: Text(
                                    entry.key,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.textSecondary,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 6,
                                  child: Text(
                                    entry.value,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.textPrimary,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],

                  // 10. Related Products
                  if (relatedProducts.isNotEmpty) ...[
                    const Text(
                      'Compatible & Related Parts',
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    SizedBox(
                      height: 235,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: relatedProducts.length,
                        itemBuilder: (context, index) {
                          return SizedBox(
                            width: 170,
                            child: ProductCard(product: relatedProducts[index]),
                          );
                        },
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildImageGallery(Product product) {
    return Container(
      height: 240,
      width: double.infinity,
      color: AppColors.slate100,
      child: product.images.isNotEmpty
          ? Image.network(
              product.images.first,
              fit: BoxFit.contain,
              errorBuilder: (_, __, ___) => const Center(
                child: Icon(Icons.devices, size: 64, color: AppColors.slate400),
              ),
            )
          : const Center(
              child: Icon(Icons.devices, size: 64, color: AppColors.slate400),
            ),
    );
  }
}
