import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthenticatedRequest, TokenPayload } from '../types/index.js';
import { sendError } from '../utils/response.js';

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Authentication required. Bearer token missing.', 401, 'UNAUTHORIZED', undefined, req.id);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
    req.user = {
      id: decoded.userId,
      phone: decoded.phone,
      role: decoded.role,
    };
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      sendError(res, 'Access token expired. Please refresh your session.', 401, 'TOKEN_EXPIRED', undefined, req.id);
      return;
    }
    sendError(res, 'Invalid access token.', 401, 'INVALID_TOKEN', undefined, req.id);
  }
}

/**
 * Optional authentication: Attaches user if valid Bearer token is provided,
 * but allows unauthenticated access to proceed (e.g. for catalogue browsing).
 */
export function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
    req.user = {
      id: decoded.userId,
      phone: decoded.phone,
      role: decoded.role,
    };
  } catch {
    // Silently continue as unauthenticated guest
  }

  next();
}
