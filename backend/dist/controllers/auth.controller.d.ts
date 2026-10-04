import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { AuthService } from '../services/auth.service.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    requestOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    verifyOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getProfile: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
}
