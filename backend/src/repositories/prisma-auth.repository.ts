import { PrismaClient, UserRole as PrismaUserRole, UserStatus as PrismaUserStatus } from '@prisma/client';
import {
  AuthRepository,
  UserEntity,
  OtpSessionEntity,
  RefreshTokenEntity,
} from './auth.repository.js';
import { UserRole, UserStatus } from '../types/index.js';
import { prisma as defaultPrisma } from '../lib/prisma.js';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaClient = defaultPrisma) {}

  async createOtpSession(data: {
    phone: string;
    hashedOtp: string;
    expiresAt: Date;
  }): Promise<OtpSessionEntity> {
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

  async findLatestOtpSession(phone: string): Promise<OtpSessionEntity | null> {
    const session = await this.prisma.otpVerification.findFirst({
      where: { phone, verified: false },
      orderBy: { createdAt: 'desc' },
    });
    if (!session) return null;
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

  async incrementOtpAttempts(sessionId: string): Promise<void> {
    await this.prisma.otpVerification.update({
      where: { id: sessionId },
      data: { attempts: { increment: 1 } },
    });
  }

  async markOtpVerified(sessionId: string): Promise<void> {
    await this.prisma.otpVerification.update({
      where: { id: sessionId },
      data: { verified: true },
    });
  }

  async findUserByPhone(phone: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (!user) return null;
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      businessName: user.businessName,
      gstin: user.gstin,
      role: user.role as UserRole,
      status: user.status as UserStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      businessName: user.businessName,
      gstin: user.gstin,
      role: user.role as UserRole,
      status: user.status as UserStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(data: {
    phone: string;
    name?: string;
    businessName?: string;
    role?: UserRole;
  }): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        phone: data.phone,
        name: data.name,
        businessName: data.businessName,
        role: (data.role as PrismaUserRole) || PrismaUserRole.CUSTOMER,
        status: PrismaUserStatus.ACTIVE,
      },
    });

    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      businessName: user.businessName,
      gstin: user.gstin,
      role: user.role as UserRole,
      status: user.status as UserStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async saveRefreshToken(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt,
        revoked: false,
      },
    });
  }

  async findRefreshToken(tokenHash: string): Promise<RefreshTokenEntity | null> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    if (!token) return null;
    return {
      id: token.id,
      userId: token.userId,
      tokenHash: token.tokenHash,
      revoked: token.revoked,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
    };
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revoked: true },
    });
  }
}
