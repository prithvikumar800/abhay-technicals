import { UserRole, UserStatus } from '../types/index.js';
export interface UserEntity {
    id: string;
    phone: string;
    name?: string | null;
    businessName?: string | null;
    gstin?: string | null;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface OtpSessionEntity {
    id: string;
    phone: string;
    hashedOtp: string;
    expiresAt: Date;
    attempts: number;
    verified: boolean;
    createdAt: Date;
}
export interface RefreshTokenEntity {
    id: string;
    userId: string;
    tokenHash: string;
    revoked: boolean;
    expiresAt: Date;
    createdAt: Date;
}
export interface AuthRepository {
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
export declare class InMemoryAuthRepository implements AuthRepository {
    private users;
    private otpSessions;
    private refreshTokens;
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
