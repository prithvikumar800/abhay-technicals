"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAuthRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_js_1 = require("../lib/prisma.js");
class PrismaAuthRepository {
    prisma;
    constructor(prisma = prisma_js_1.prisma) {
        this.prisma = prisma;
    }
    async createOtpSession(data) {
        const session = await this.prisma.otpVerification.create({
            data: {
                phone: data.phone,
                hashedOtp: data.hashedOtp,
                expiresAt: data.expiresAt,
                attempts: 0,
                verified: false,
            },
        });
        return {
            id: session.id,
            phone: session.phone,
            hashedOtp: session.hashedOtp,
            expiresAt: session.expiresAt,
            attempts: session.attempts,
            verified: session.verified,
            createdAt: session.createdAt,
        };
    }
    async findLatestOtpSession(phone) {
        const session = await this.prisma.otpVerification.findFirst({
            where: { phone, verified: false },
            orderBy: { createdAt: 'desc' },
        });
        if (!session)
            return null;
        return {
            id: session.id,
            phone: session.phone,
            hashedOtp: session.hashedOtp,
            expiresAt: session.expiresAt,
            attempts: session.attempts,
            verified: session.verified,
            createdAt: session.createdAt,
        };
    }
    async incrementOtpAttempts(sessionId) {
        await this.prisma.otpVerification.update({
            where: { id: sessionId },
            data: { attempts: { increment: 1 } },
        });
    }
    async markOtpVerified(sessionId) {
        await this.prisma.otpVerification.update({
            where: { id: sessionId },
            data: { verified: true },
        });
    }
    async findUserByPhone(phone) {
        const user = await this.prisma.user.findUnique({
            where: { phone },
        });
        if (!user)
            return null;
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            businessName: user.businessName,
            gstin: user.gstin,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async findUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user)
            return null;
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            businessName: user.businessName,
            gstin: user.gstin,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async createUser(data) {
        const user = await this.prisma.user.create({
            data: {
                phone: data.phone,
                name: data.name,
                businessName: data.businessName,
                role: data.role || client_1.UserRole.CUSTOMER,
                status: client_1.UserStatus.ACTIVE,
            },
        });
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            businessName: user.businessName,
            gstin: user.gstin,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async saveRefreshToken(data) {
        await this.prisma.refreshToken.create({
            data: {
                userId: data.userId,
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt,
                revoked: false,
            },
        });
    }
    async findRefreshToken(tokenHash) {
        const token = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
        });
        if (!token)
            return null;
        return {
            id: token.id,
            userId: token.userId,
            tokenHash: token.tokenHash,
            revoked: token.revoked,
            expiresAt: token.expiresAt,
            createdAt: token.createdAt,
        };
    }
    async revokeRefreshToken(tokenHash) {
        await this.prisma.refreshToken.updateMany({
            where: { tokenHash },
            data: { revoked: true },
        });
    }
}
exports.PrismaAuthRepository = PrismaAuthRepository;
//# sourceMappingURL=prisma-auth.repository.js.map