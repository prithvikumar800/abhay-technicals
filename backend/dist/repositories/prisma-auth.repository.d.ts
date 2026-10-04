import { PrismaClient } from '@prisma/client';
import { AuthRepository, UserEntity, OtpSessionEntity, RefreshTokenEntity } from './auth.repository.js';
import { UserRole } from '../types/index.js';
export declare class PrismaAuthRepository implements AuthRepository {
    private prisma;
    constructor(prisma?: PrismaClient);
    createOtpSession(data: {
        phone: string;
        hashedOtp: string;
        expiresAt: Date;
    }): Promise<OtpSessionEntity>;
    findLatestOtpSession(phone: string): Promise<OtpSessionEntity | null>;
    incrementOtpAttempts(sessionId: string): Promise<void>;
    markOtpVerified(sessionId: string): Promise<void>;
    findUserByPhone(phone: string): Promise<UserEntity | null>;
    findUserById(id: string): Promise<UserEntity | null>;
    createUser(data: {
        phone: string;
        name?: string;
        businessName?: string;
        role?: UserRole;
    }): Promise<UserEntity>;
    saveRefreshToken(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }): Promise<void>;
    findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null>;
    revokeRefreshToken(tokenHash: string): Promise<void>;
}
