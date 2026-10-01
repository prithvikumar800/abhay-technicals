import 'package:flutter_test/flutter_test.dart';
import 'test_helper.dart';
import 'package:abhay_technicals/models/product.dart';
import 'package:abhay_technicals/models/wholesale_tier.dart';
import 'package:abhay_technicals/providers/cart_provider.dart';
import 'package:abhay_technicals/repositories/cart_repository.dart';

void main() {
  group('Cart Repository & Provider Calculation Tests', () {
    late CartRepository repository;
    late CartProvider provider;

    const testBattery = Product(
      id: 'prod-bat-1',
      name: 'Vivo Y11 Battery',
      sku: 'BAT-VIV-Y11',
      retailPrice: 599.0,
      salePrice: 499.0,
      stock: 40,
      moq: 2,
      wholesaleTiers: [
        WholesaleTier(minQuantity: 5, unitPrice: 380.0),
        WholesaleTier(minQuantity: 10, unitPrice: 350.0),
      ],
    );

    setUp(() {
      final client = createMockApiClient();
      repository = CartRepository(apiClient: client);
      provider = CartProvider(cartRepository: repository);
    });

    test('1. Initial cart is empty with zero subtotal and fee', () {
      expect(provider.isEmpty, true);
      expect(provider.subtotal, 0.0);
      expect(provider.shippingFee, 0.0);
      expect(provider.total, 0.0);
    });

    test('2. Adding product respects minimum order quantity (MOQ)', () async {
      // Requested qty is 1, but product has MOQ = 2
      await provider.addToCart(testBattery, quantity: 1);

      expect(provider.items.length, 1);
      final item = provider.items.first;
      expect(item.quantity, 2); // Auto-adjusted to MOQ
      expect(item.unitPrice, 499.0);
      expect(item.totalPrice, 998.0);
      expect(provider.subtotal, 998.0);
      // Below 999 threshold -> standard shipping fee 49.0 applied
      expect(provider.shippingFee, 49.0);
      expect(provider.total, 1047.0);
      expect(provider.isEligibleForFreeShipping, false);
      expect(provider.freeShippingShortfall, 1.0);
    });

    test('3. Free shipping threshold automatically triggers when subtotal >= 999', () async {
      await provider.addToCart(testBattery, quantity: 4); // 4 * 499 = 1996.0

      expect(provider.subtotal, 1996.0);
      expect(provider.isEligibleForFreeShipping, true);
      expect(provider.shippingFee, 0.0);
      expect(provider.total, 1996.0);
      expect(provider.freeShippingShortfall, 0.0);
    });

    test('4. Wholesale tier pricing activates when authorized and quantity reaches slab', () async {
      // Add with isWholesale: true, quantity: 5 (reaches tier 1 @ 380.0)
      await provider.addToCart(testBattery, quantity: 5, isWholesale: true);

      final item = provider.items.first;
      expect(item.quantity, 5);
      expect(item.unitPrice, 380.0);
      expect(item.totalPrice, 1900.0);
      expect(provider.subtotal, 1900.0);
      expect(provider.shippingFee, 0.0);
    });

    test('5. Decreasing below MOQ throws MOQ violation or prevents illegal state', () async {
      await provider.addToCart(testBattery, quantity: 2);
      final item = provider.items.first;

      // Try setting quantity below MOQ (1 < 2)
      await provider.updateQuantity(item.id, 1);

      // Provider catches MoqException and preserves error message
      expect(provider.errorMessage, contains('Minimum order quantity'));
      // Quantity remains at valid MOQ
      expect(provider.items.first.quantity, 2);
    });

    test('6. Removing item and clearing cart resets state', () async {
      await provider.addToCart(testBattery, quantity: 2);
      expect(provider.isEmpty, false);

      await provider.clearCart();
      expect(provider.isEmpty, true);
      expect(provider.subtotal, 0.0);
      expect(provider.total, 0.0);
    });
  });
}
