import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
export declare function requestIdMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
