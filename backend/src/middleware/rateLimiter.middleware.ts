import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';

export const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 120, // 120 requests per minute per IP
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 'Too many requests. Please slow down.', 429, 'RATE_LIMIT_EXCEEDED');
  },
});

export const authOtpRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 5, // Maximum 5 OTP requests per hour per IP/Device
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(
      res,
      'Maximum OTP request threshold reached. Please wait an hour before requesting again.',
      429,
      'OTP_RATE_LIMIT_EXCEEDED'
    );
  },
});
