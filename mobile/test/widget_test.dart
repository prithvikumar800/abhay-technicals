import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:abhay_technicals/core/network/api_client.dart';
import 'package:abhay_technicals/core/security/secure_storage_service.dart';
import 'package:abhay_technicals/main.dart';
import 'package:abhay_technicals/providers/auth_provider.dart';
import 'package:abhay_technicals/providers/cart_provider.dart';
import 'package:abhay_technicals/providers/catalogue_provider.dart';
import 'package:abhay_technicals/providers/model_explorer_provider.dart';
import 'package:abhay_technicals/providers/order_provider.dart';
import 'package:abhay_technicals/repositories/auth_repository.dart';
import 'package:abhay_technicals/repositories/cart_repository.dart';
import 'package:abhay_technicals/repositories/catalogue_repository.dart';
import 'package:abhay_technicals/repositories/order_repository.dart';

void main() {
  testWidgets('AbhayTechnicalsApp renders main shell and bottom navigation',
      (WidgetTester tester) async {
    final storage = InMemorySecureStorageService();
    final apiClient = ApiClient(storage: storage);
    final authRepo = AuthRepository(apiClient: apiClient, storage: storage);
    final catalogueRepo = CatalogueRepository(apiClient: apiClient);
    final cartRepo = CartRepository(apiClient: apiClient);
    final orderRepo = OrderRepository(apiClient: apiClient);

    await tester.pumpWidget(
      MultiProvider(
        providers: [
          Provider<ApiClient>.value(value: apiClient),
          Provider<AuthRepository>.value(value: authRepo),
          Provider<CatalogueRepository>.value(value: catalogueRepo),
          Provider<CartRepository>.value(value: cartRepo),
          Provider<OrderRepository>.value(value: orderRepo),

          ChangeNotifierProvider<AuthProvider>(
            create: (_) => AuthProvider(authRepository: authRepo),
          ),
          ChangeNotifierProvider<CatalogueProvider>(
            create: (_) => CatalogueProvider(repository: catalogueRepo),
          ),
          ChangeNotifierProvider<ModelExplorerProvider>(
            create: (_) => ModelExplorerProvider(repository: catalogueRepo),
          ),
          ChangeNotifierProvider<CartProvider>(
            create: (_) => CartProvider(cartRepository: cartRepo),
          ),
          ChangeNotifierProvider<OrderProvider>(
            create: (_) => OrderProvider(orderRepository: orderRepo),
          ),
        ],
        child: const AbhayTechnicalsApp(),
      ),
    );

    // Initial frame
    await tester.pump();

    // Verify key technician bottom navigation tabs are present
    expect(find.text('Home'), findsWidgets);
    expect(find.text('Categories'), findsWidgets);
    expect(find.text('Part Finder'), findsWidgets);
    expect(find.text('Cart'), findsWidgets);
    expect(find.text('Account'), findsWidgets);
  });
}
