import 'package:flutter_test/flutter_test.dart';
import 'package:abhay_technicals/models/product.dart';
import 'package:abhay_technicals/models/wholesale_tier.dart';

void main() {
  group('Product Model & Wholesale Pricing Calculation Tests', () {
    const sampleProduct = Product(
      id: 'prod-test-1',
      name: 'Original 5000mAh Battery for Vivo Y11',
      sku: 'BAT-VIV-Y11-BK3',
      brand: 'Vivo',
      category: 'Mobile Batteries',
      compatibility: 'Fits Vivo Y11 2019 / Vivo Y12',
      compatibleModels: ['Vivo Y11 2019', 'Vivo Y12'],
      retailPrice: 599.0,
      salePrice: 499.0,
      stock: 50,
      moq: 2,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 5, unitPrice: 380.0),
        WholesaleTier(minQuantity: 10, unitPrice: 350.0),
        WholesaleTier(minQuantity: 25, unitPrice: 320.0),
      ],
    );

    test('1. Product model parses correctly and identifies effective price', () {
      expect(sampleProduct.effectivePrice, 499.0);
      expect(sampleProduct.isOutOfStock, false);
      expect(sampleProduct.moq, 2);
    });

    test('2. Unauthenticated / Non-wholesale users only get effective price', () {
      // Regardless of quantity, if isWholesaleAuthorized is false, price remains effectivePrice
      final priceFor1 = sampleProduct.getUnitPriceForQuantity(1, isWholesaleAuthorized: false);
      final priceFor10 = sampleProduct.getUnitPriceForQuantity(10, isWholesaleAuthorized: false);

      expect(priceFor1, 499.0);
      expect(priceFor10, 499.0);
    });

    test('3. Authenticated wholesale users unlock quantity discount tiers', () {
      // Below lowest tier (qty < 5) -> effectivePrice
      final priceFor3 = sampleProduct.getUnitPriceForQuantity(3, isWholesaleAuthorized: true);
      expect(priceFor3, 499.0);

      // Tier 1: 5+ pcs -> 380.0
      final priceFor5 = sampleProduct.getUnitPriceForQuantity(5, isWholesaleAuthorized: true);
      expect(priceFor5, 380.0);

      // Tier 2: 10+ pcs -> 350.0
      final priceFor12 = sampleProduct.getUnitPriceForQuantity(12, isWholesaleAuthorized: true);
      expect(priceFor12, 350.0);

      // Tier 3: 25+ pcs -> 320.0
      final priceFor30 = sampleProduct.getUnitPriceForQuantity(30, isWholesaleAuthorized: true);
      expect(priceFor30, 320.0);
    });

    test('4. JSON serialization and deserialization preserves all attributes', () {
      final json = sampleProduct.toJson();
      final reconstructed = Product.fromJson(json);

      expect(reconstructed.id, sampleProduct.id);
      expect(reconstructed.sku, sampleProduct.sku);
      expect(reconstructed.compatibility, sampleProduct.compatibility);
      expect(reconstructed.wholesaleTiers.length, 3);
      expect(reconstructed.wholesaleTiers[0].unitPrice, 380.0);
    });
  });
}
