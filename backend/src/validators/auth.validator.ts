import { z } from 'zod';

/**
 * Normalizes Indian mobile numbers into clean E.164 format (+91XXXXXXXXXX).
 */
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const requestOtpSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Invalid mobile number. Please provide a valid 10-digit Indian phone number')
    .transform((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 ? `+91${digits}` : `+${digits}`;
    }),
});

export const verifyOtpSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Invalid mobile number')
    .transform((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 ? `+91${digits}` : `+${digits}`;
    }),
  otp: z
    .string({ required_error: 'OTP is required' })
    .trim()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain numbers only'),
  name: z.string().trim().max(100).optional(),
  businessName: z.string().trim().max(150).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string({ required_error: 'Refresh token is required' }).min(1),
});
