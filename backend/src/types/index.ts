import { Request } from 'express';

export type UserRole = 'CUSTOMER' | 'WHOLESALER' | 'ADMIN' | 'STAFF';
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'PENDING_VERIFICATION';

export interface TokenPayload {
  userId: string;
  phone: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: string;
  phone: string;
  name?: string | null;
  businessName?: string | null;
  gstin?: string | null;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  id?: string; // Request correlation ID
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  meta?: {
    requestId?: string;
    timestamp: string;
    pagination?: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

export type WholesalePricingMode = 'LOGIN_GATED' | 'PUBLIC' | 'WHOLESALER_ONLY';
