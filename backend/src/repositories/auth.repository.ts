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
  createOtpSession(data: { phone: string; hashedOtp: string; expiresAt: Date }): Promise<OtpSessionEntity>;
  findLatestOtpSession(phone: string): Promise<OtpSessionEntity | null>;
  incrementOtpAttempts(sessionId: string): Promise<void>;
  markOtpVerified(sessionId: string): Promise<void>;
  findUserByPhone(phone: string): Promise<UserEntity | null>;
  findUserById(id: string): Promise<UserEntity | null>;
  createUser(data: { phone: string; name?: string; businessName?: string; role?: UserRole }): Promise<UserEntity>;
  saveRefreshToken(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<void>;
  findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null>;
  revokeRefreshToken(tokenHash: string): Promise<void>;
}

// In-Memory implementation for isolated development and testing without requiring live DB connection
export class InMemoryAuthRepository implements AuthRepository {
  private users: Map<string, UserEntity> = new Map();
  private otpSessions: OtpSessionEntity[] = [];
  private refreshTokens: Map<string, RefreshTokenEntity> = new Map();

  async createOtpSession(data: { phone: string; hashedOtp: string; expiresAt: Date }): Promise<OtpSessionEntity> {
    const session: OtpSessionEntity = {
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

  async findLatestOtpSession(phone: string): Promise<OtpSessionEntity | null> {
    const matching = this.otpSessions
      .filter((s) => s.phone === phone && !s.verified)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return matching[0] || null;
  }

  async incrementOtpAttempts(sessionId: string): Promise<void> {
    const session = this.otpSessions.find((s) => s.id === sessionId);
    if (session) {
      session.attempts += 1;
    }
  }

  async markOtpVerified(sessionId: string): Promise<void> {
    const session = this.otpSessions.find((s) => s.id === sessionId);
    if (session) {
      session.verified = true;
    }
  }

  async findUserByPhone(phone: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.phone === phone) return user;
    }
    return null;
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) || null;
  }

  async createUser(data: { phone: string; name?: string; businessName?: string; role?: UserRole }): Promise<UserEntity> {
    const user: UserEntity = {
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

  async saveRefreshToken(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<void> {
    this.refreshTokens.set(data.tokenHash, {
      id: `ref_${Date.now()}`,
      userId: data.userId,
      tokenHash: data.tokenHash,
      revoked: false,
      expiresAt: data.expiresAt,
      createdAt: new Date(),
    });
  }

  async findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null> {
    return this.refreshTokens.get(tokenHash) || null;
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    const token = this.refreshTokens.get(tokenHash);
    if (token) {
      token.revoked = true;
    }
  }
}
