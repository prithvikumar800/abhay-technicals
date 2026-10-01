import 'package:url_launcher/url_launcher.dart';
import '../core/config/app_config.dart';
import '../models/product.dart';

class WhatsAppService {
  final String _supportPhone;

  WhatsAppService({String? supportPhone})
      : _supportPhone = supportPhone ?? AppConfig.supportWhatsAppNumber;

  String get supportPhone => _supportPhone;

  /// Builds a standard WhatsApp wa.me direct link with URL-encoded message
  String buildProductEnquiryUrl(Product product) {
    final sanitizedPhone = _supportPhone.replaceAll(RegExp(r'[^0-9]'), '');
    final message = '''
Hi, I want to enquire about:
Product: ${product.name}
SKU: ${product.sku}
Compatibility: ${product.compatibility.isNotEmpty ? product.compatibility : 'N/A'}
Link: https://abhaytechnicals.com/products/${product.sku}
'''.trim();

    final encodedMessage = Uri.encodeComponent(message);
    return 'https://wa.me/$sanitizedPhone?text=$encodedMessage';
  }

  /// Builds a general support chat URL
  String buildGeneralSupportUrl() {
    final sanitizedPhone = _supportPhone.replaceAll(RegExp(r'[^0-9]'), '');
    const message = 'Hi Abhay Technicals team, I need help with mobile spare parts / order enquiry.';
    final encodedMessage = Uri.encodeComponent(message);
    return 'https://wa.me/$sanitizedPhone?text=$encodedMessage';
  }

  /// Launches the WhatsApp chat
  Future<bool> launchProductEnquiry(Product product) async {
    final urlString = buildProductEnquiryUrl(product);
    final uri = Uri.parse(urlString);

    if (await canLaunchUrl(uri)) {
      return await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
    return false;
  }

  /// Launches general WhatsApp support
  Future<bool> launchGeneralSupport() async {
    final urlString = buildGeneralSupportUrl();
    final uri = Uri.parse(urlString);

    if (await canLaunchUrl(uri)) {
      return await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
    return false;
  }
}
