"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAuthRepository = void 0;
// In-Memory implementation for isolated development and testing without requiring live DB connection
class InMemoryAuthRepository {
    users = new Map();
    otpSessions = [];
    refreshTokens = new Map();
    async createOtpSession(data) {
        const session = {
            id: `otp_${Date.now()}_${Math.random()}`,
            phone: data.phone,
            hashedOtp: data.hashedOtp,
            expiresAt: data.expiresAt,
            attempts: 0,
            verified: false,
            createdAt: new Date(),
        };
        this.otpSessions.push(session);
        return session;
    }
    async findLatestOtpSession(phone) {
        const matching = this.otpSessions
            .filter((s) => s.phone === phone && !s.verified)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return matching[0] || null;
    }
    async incrementOtpAttempts(sessionId) {
        const session = this.otpSessions.find((s) => s.id === sessionId);
        if (session) {
            session.attempts += 1;
        }
    }
    async markOtpVerified(sessionId) {
        const session = this.otpSessions.find((s) => s.id === sessionId);
        if (session) {
            session.verified = true;
        }
    }
    async findUserByPhone(phone) {
        for (const user of this.users.values()) {
            if (user.phone === phone)
                return user;
        }
        return null;
    }
    async findUserById(id) {
        return this.users.get(id) || null;
    }
    async createUser(data) {
        const user = {
            id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            phone: data.phone,
            name: data.name || null,
            businessName: data.businessName || null,
            gstin: null,
            role: data.role || 'CUSTOMER',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.set(user.id, user);
        return user;
    }
    async saveRefreshToken(data) {
        this.refreshTokens.set(data.tokenHash, {
            id: `ref_${Date.now()}`,
            userId: data.userId,
            tokenHash: data.tokenHash,
            revoked: false,
            expiresAt: data.expiresAt,
            createdAt: new Date(),
        });
    }
    async findRefreshToken(tokenHash) {
        return this.refreshTokens.get(tokenHash) || null;
    }
    async revokeRefreshToken(tokenHash) {
        const token = this.refreshTokens.get(tokenHash);
        if (token) {
            token.revoked = true;
        }
    }
}
exports.InMemoryAuthRepository = InMemoryAuthRepository;
//# sourceMappingURL=auth.repository.js.map