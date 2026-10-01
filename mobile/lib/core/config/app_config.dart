class AppConfig {
  static const String appName = 'ABHAY TECHNICALS';
  static const String appTagline = 'Spare Parts & Tools for Technicians';
  static const String appVersion = '1.0.0';

  // Configurable via --dart-define=API_BASE_URL=...
  // Default to 10.0.2.2 for Android Emulator (maps to host localhost:5000)
  // or 127.0.0.1 for local/desktop testing
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:5000/api/v1',
  );

  static const String supportWhatsAppNumber = String.fromEnvironment(
    'WHATSAPP_NUMBER',
    defaultValue: '+919876543210',
  );

  static const String supportEmail = 'support@abhaytechnicals.com';
  static const String currencySymbol = '₹';

  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 15);

  static const double freeShippingThreshold = 999.0;
  static const double standardShippingFee = 49.0;

  // Wholesale pricing policy: LOGIN_GATED
  // Retail shown to guest; wholesale tiers shown when authenticated.
  static const bool isWholesaleLoginGated = true;
}
