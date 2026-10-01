import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/config/app_config.dart';
import 'core/network/api_client.dart';
import 'core/security/secure_storage_service.dart';
import 'core/theme/app_theme.dart';
import 'models/product.dart';
import 'repositories/auth_repository.dart';
import 'repositories/catalogue_repository.dart';
import 'repositories/cart_repository.dart';
import 'repositories/order_repository.dart';
import 'providers/auth_provider.dart';
import 'providers/catalogue_provider.dart';
import 'providers/model_explorer_provider.dart';
import 'providers/cart_provider.dart';
import 'providers/order_provider.dart';

import 'features/home/screens/home_screen.dart';
import 'features/catalogue/screens/catalogue_screen.dart';
import 'features/model_explorer/screens/model_explorer_screen.dart';
import 'features/cart/screens/cart_screen.dart';
import 'features/account/screens/account_screen.dart';
import 'features/product/screens/product_detail_screen.dart';
import 'features/checkout/screens/checkout_screen.dart';
import 'features/auth/screens/otp_request_screen.dart';
import 'features/auth/screens/otp_verify_screen.dart';
import 'features/orders/screens/order_list_screen.dart';
import 'features/orders/screens/order_detail_screen.dart';
import 'features/tracking/screens/tracking_screen.dart';
import 'features/wishlist/screens/wishlist_screen.dart';
import 'features/notifications/screens/notifications_screen.dart';
import 'widgets/bottom_nav_bar.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Instantiate core infrastructure
  final storage = SecureStorageService();
  final apiClient = ApiClient(storage: storage);

  final authRepo = AuthRepository(apiClient: apiClient, storage: storage);
  final catalogueRepo = CatalogueRepository(apiClient: apiClient);
  final cartRepo = CartRepository(apiClient: apiClient);
  final orderRepo = OrderRepository(apiClient: apiClient);

  runApp(
    MultiProvider(
      providers: [
        Provider<ApiClient>.value(value: apiClient),
        Provider<AuthRepository>.value(value: authRepo),
        Provider<CatalogueRepository>.value(value: catalogueRepo),
        Provider<CartRepository>.value(value: cartRepo),
        Provider<OrderRepository>.value(value: orderRepo),

        ChangeNotifierProvider<AuthProvider>(
          create: (_) => AuthProvider(authRepository: authRepo)..initializeSession(),
        ),
        ChangeNotifierProvider<CatalogueProvider>(
          create: (_) => CatalogueProvider(repository: catalogueRepo)..loadInitialData(),
        ),
        ChangeNotifierProvider<ModelExplorerProvider>(
          create: (_) => ModelExplorerProvider(repository: catalogueRepo),
        ),
        ChangeNotifierProvider<CartProvider>(
          create: (_) => CartProvider(cartRepository: cartRepo)..loadCart(),
        ),
        ChangeNotifierProvider<OrderProvider>(
          create: (_) => OrderProvider(orderRepository: orderRepo),
        ),
      ],
      child: const AbhayTechnicalsApp(),
    ),
  );
}

class AbhayTechnicalsApp extends StatelessWidget {
  const AbhayTechnicalsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppConfig.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (_) => const MainNavigationShell());
          case '/catalogue':
            final args = settings.arguments as Map<String, dynamic>?;
            final focusSearch = args?['focusSearch'] == true;
            return MaterialPageRoute(builder: (_) => CatalogueScreen(focusSearch: focusSearch));
          case '/product-detail':
            final product = settings.arguments as Product;
            return MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product));
          case '/cart':
            return MaterialPageRoute(builder: (_) => const CartScreen());
          case '/checkout':
            return MaterialPageRoute(builder: (_) => const CheckoutScreen());
          case '/login':
            return MaterialPageRoute(builder: (_) => const OtpRequestScreen());
          case '/verify-otp':
            return MaterialPageRoute(builder: (_) => const OtpVerifyScreen());
          case '/orders':
            return MaterialPageRoute(builder: (_) => const OrderListScreen());
          case '/order-detail':
            final orderId = settings.arguments as String;
            return MaterialPageRoute(builder: (_) => OrderDetailScreen(orderId: orderId));
          case '/tracking':
            final awb = settings.arguments as String;
            return MaterialPageRoute(builder: (_) => TrackingScreen(awb: awb));
          case '/wishlist':
            return MaterialPageRoute(builder: (_) => const WishlistScreen());
          case '/notifications':
            return MaterialPageRoute(builder: (_) => const NotificationsScreen());
          default:
            return MaterialPageRoute(builder: (_) => const MainNavigationShell());
        }
      },
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  void _onTabChanged(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      HomeScreen(onNavigateTab: _onTabChanged),
      const CatalogueScreen(),
      const ModelExplorerScreen(),
      const CartScreen(),
      const AccountScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: BottomNavBar(
        currentIndex: _currentIndex,
        onTap: _onTabChanged,
      ),
    );
  }
}
