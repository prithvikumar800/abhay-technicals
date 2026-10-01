import { logger } from '../../utils/logger.js';

export interface WhatsAppProvider {
  sendOtp(phone: string, otp: string): Promise<{ success: boolean; messageId: string }>;
}

export class MockWhatsAppProvider implements WhatsAppProvider {
  async sendOtp(phone: string, _otp: string): Promise<{ success: boolean; messageId: string }> {
    // Mask phone number for security in logs
    const maskedPhone = phone.replace(/(\+\d{2})(\d{2})(\d{4})(\d{2})/, '$1 $2****$4');
    
    // In development mode only, log a safe notification
    logger.info({
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
