"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockWhatsAppProvider = void 0;
const logger_js_1 = require("../../utils/logger.js");
class MockWhatsAppProvider {
    async sendOtp(phone, _otp) {
        // Mask phone number for security in logs
        const maskedPhone = phone.replace(/(\+\d{2})(\d{2})(\d{4})(\d{2})/, '$1 $2****$4');
        // In development mode only, log a safe notification
        logger_js_1.logger.info({
            event: 'WHATSAPP_MOCK_DISPATCH',
            phone: maskedPhone,
            status: 'DELIVERED',
            note: 'Mock WhatsApp Provider active — no external Meta API calls made.',
        });
        return {
            success: true,
            messageId: `mock_msg_${Date.now()}`,
        };
    }
}
exports.MockWhatsAppProvider = MockWhatsAppProvider;
//# sourceMappingURL=whatsapp.provider.js.map