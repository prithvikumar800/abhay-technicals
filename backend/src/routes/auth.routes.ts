import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { PrismaAuthRepository } from '../repositories/prisma-auth.repository.js';
import { InMemoryAuthRepository } from '../repositories/auth.repository.js';
import { MockWhatsAppProvider } from '../lib/providers/whatsapp.provider.js';
import { validate } from '../middleware/validate.middleware.js';
import { requestOtpSchema, verifyOtpSchema, refreshTokenSchema } from '../validators/auth.validator.js';
import { authOtpRateLimiter } from '../middleware/rateLimiter.middleware.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export function createAuthRouter(
  authService?: AuthService
): Router {
  const router = Router();
  const repo = process.env.DATABASE_URL
    ? new PrismaAuthRepository()
    : new InMemoryAuthRepository();
  const service =
    authService ||
    new AuthService(repo, new MockWhatsAppProvider());
  const controller = new AuthController(service);

  // POST /api/v1/auth/request-otp (Strictly rate-limited)
  router.post('/request-otp', authOtpRateLimiter, validate(requestOtpSchema, 'body'), controller.requestOtp);

  // POST /api/v1/auth/verify-otp
  router.post('/verify-otp', validate(verifyOtpSchema, 'body'), controller.verifyOtp);

  // POST /api/v1/auth/refresh
  router.post('/refresh', validate(refreshTokenSchema, 'body'), controller.refreshToken);

  // POST /api/v1/auth/refresh-token (alias for mobile client compatibility)
  router.post('/refresh-token', validate(refreshTokenSchema, 'body'), controller.refreshToken);

  // POST /api/v1/auth/logout
  router.post('/logout', controller.logout);

  // GET /api/v1/auth/me (Protected)
  router.get('/me', requireAuth, controller.getProfile);

  return router;
}
