import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
export declare function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
/**
 * Optional authentication: Attaches user if valid Bearer token is provided,
 * but allows unauthenticated access to proceed (e.g. for catalogue browsing).
 */
export declare function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void;
