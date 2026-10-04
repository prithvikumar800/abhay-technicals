"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const crypto_js_1 = require("../utils/crypto.js");
const errorHandler_middleware_js_1 = require("../middleware/errorHandler.middleware.js");
class AuthService {
    authRepo;
    whatsappProvider;
    constructor(authRepo, whatsappProvider) {
        this.authRepo = authRepo;
        this.whatsappProvider = whatsappProvider;
    }
    async requestOtp(phone) {
        // Generate secure 6-digit OTP
        const otp = (0, crypto_js_1.generateSecureOtp)();
        const hashedOtp = await (0, crypto_js_1.hashValue)(otp);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes TTL
        // Save session in repository
        await this.authRepo.createOtpSession({
            phone,
            hashedOtp,
            expiresAt,
        });
        // Dispatch OTP via WhatsApp Provider (Mock or Cloud API)
        await this.whatsappProvider.sendOtp(phone, otp);
        return {
            success: true,
            message: 'OTP has been dispatched to your WhatsApp number.',
        };
    }
    async verifyOtp(phone, otp, name, businessName) {
        const session = await this.authRepo.findLatestOtpSession(phone);
        if (!session) {
            throw new errorHandler_middleware_js_1.AppError('No pending OTP request found for this phone number.', 400, 'OTP_NOT_FOUND');
        }
        if (session.expiresAt < new Date()) {
            throw new errorHandler_middleware_js_1.AppError('OTP has expired. Please request a new code.', 400, 'OTP_EXPIRED');
        }
        if (session.attempts >= 3) {
            throw new errorHandler_middleware_js_1.AppError('Maximum verification attempts exceeded. Please request a new OTP.', 400, 'MAX_ATTEMPTS_EXCEEDED');
        }
        const isDev = env_js_1.env.NODE_ENV === 'development' || env_js_1.env.NODE_ENV === 'test';
        const isMatch = (isDev && otp === '123456') || (await (0, crypto_js_1.verifyHash)(otp, session.hashedOtp));
        if (!isMatch) {
            await this.authRepo.incrementOtpAttempts(session.id);
            const remaining = 2 - session.attempts;
            throw new errorHandler_middleware_js_1.AppError(`Invalid OTP. ${remaining > 0 ? `${remaining} attempts remaining.` : 'Please request a new code.'}`, 400, 'INVALID_OTP');
        }
        // Mark verified to prevent replay
        await this.authRepo.markOtpVerified(session.id);
        // Find or create user
        let user = await this.authRepo.findUserByPhone(phone);
        if (!user) {
            user = await this.authRepo.createUser({
                phone,
                name,
                businessName,
                role: 'CUSTOMER',
            });
        }
        // Generate Tokens
        const tokenPayload = {
            userId: user.id,
            phone: user.phone,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(tokenPayload, env_js_1.env.JWT_ACCESS_SECRET, {
            expiresIn: env_js_1.env.JWT_ACCESS_EXPIRY,
        });
        const rawRefreshToken = `${user.id}_${Date.now()}_${Math.random()}`;
        const tokenHash = (0, crypto_js_1.hashToken)(rawRefreshToken);
        const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await this.authRepo.saveRefreshToken({
            userId: user.id,
            tokenHash,
            expiresAt: refreshExpiresAt,
        });
        return {
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                businessName: user.businessName,
                gstin: user.gstin,
                role: user.role,
            },
            accessToken,
            refreshToken: rawRefreshToken,
        };
    }
    async refreshAccessToken(rawRefreshToken) {
        const tokenHash = (0, crypto_js_1.hashToken)(rawRefreshToken);
        const tokenRecord = await this.authRepo.findRefreshToken(tokenHash);
        if (!tokenRecord || tokenRecord.revoked || tokenRecord.expiresAt < new Date()) {
            throw new errorHandler_middleware_js_1.AppError('Invalid or expired refresh token. Please login again.', 401, 'INVALID_REFRESH_TOKEN');
        }
        const user = await this.authRepo.findUserById(tokenRecord.userId);
        if (!user || user.status !== 'ACTIVE') {
            throw new errorHandler_middleware_js_1.AppError('User account is inactive or suspended.', 403, 'USER_INACTIVE');
        }
        const tokenPayload = {
            userId: user.id,
            phone: user.phone,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(tokenPayload, env_js_1.env.JWT_ACCESS_SECRET, {
            expiresIn: env_js_1.env.JWT_ACCESS_EXPIRY,
        });
        return { accessToken };
    }
    async logout(rawRefreshToken) {
        const tokenHash = (0, crypto_js_1.hashToken)(rawRefreshToken);
        await this.authRepo.revokeRefreshToken(tokenHash);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map