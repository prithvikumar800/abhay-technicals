class ApiEndpoints {
  // Authentication
  static const String authRequestOtp = '/auth/request-otp';
  static const String authVerifyOtp = '/auth/verify-otp';
  static const String authMe = '/auth/me';
  static const String authLogout = '/auth/logout';
  static const String authRefreshToken = '/auth/refresh-token';

  // Catalogue
  static const String categories = '/categories';
  static const String brands = '/brands';
  static const String products = '/products';
  static String productDetail(String id) => '/products/$id';

  // Cart
  static const String cart = '/cart';
  static const String cartItems = '/cart/items';
  static String cartItem(String itemId) => '/cart/items/$itemId';

  // Checkout
  static const String checkoutValidate = '/checkout/validate';
  static const String checkoutProcess = '/checkout/process';

  // Orders
  static const String orders = '/orders';
  static String orderDetail(String orderId) => '/orders/$orderId';

  // Shipments & Tracking
  static String shipmentTrack(String awb) => '/shipments/track/$awb';

  // Customer Profile & Addresses
  static const String userAddresses = '/users/addresses';
  static const String userProfile = '/users/profile';
}
