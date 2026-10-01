import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { AuthService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  requestOtp = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { phone } = req.body;
      const result = await this.authService.requestOtp(phone);
      sendSuccess(res, result, 'OTP dispatched successfully');
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { phone, otp, name, businessName } = req.body;
      const result = await this.authService.verifyOtp(phone, otp, name, businessName);
      sendSuccess(res, result, 'Authentication successful', 200);
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshAccessToken(refreshToken);
      sendSuccess(res, result, 'Token refreshed successfully');
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }
      sendSuccess(res, { loggedOut: true }, 'Successfully logged out');
    } catch (err) {
      next(err);
    }
  };

  getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      sendSuccess(res, { user: req.user }, 'Current user profile');
    } catch (err) {
      next(err);
    }
  };
}
