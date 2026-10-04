export interface WhatsAppProvider {
    sendOtp(phone: string, otp: string): Promise<{
        success: boolean;
        messageId: string;
    }>;
}
export declare class MockWhatsAppProvider implements WhatsAppProvider {
    sendOtp(phone: string, _otp: string): Promise<{
        success: boolean;
        messageId: string;
    }>;
}
