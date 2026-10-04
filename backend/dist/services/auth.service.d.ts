import { AuthRepository } from '../repositories/auth.repository.js';
import { WhatsAppProvider } from '../lib/providers/whatsapp.provider.js';
import { AuthenticatedUser } from '../types/index.js';
export declare class AuthService {
    private authRepo;
    private whatsappProvider;
    constructor(authRepo: AuthRepository, whatsappProvider: WhatsAppProvider);
    requestOtp(phone: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(phone: string, otp: string, name?: string, businessName?: string): Promise<{
        user: AuthenticatedUser;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken(rawRefreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(rawRefreshToken: string): Promise<void>;
}
