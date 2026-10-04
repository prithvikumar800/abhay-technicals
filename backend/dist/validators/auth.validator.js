"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.verifyOtpSchema = exports.requestOtpSchema = void 0;
const zod_1 = require("zod");
/**
 * Normalizes Indian mobile numbers into clean E.164 format (+91XXXXXXXXXX).
 */
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
exports.requestOtpSchema = zod_1.z.object({
    phone: zod_1.z
        .string({ required_error: 'Phone number is required' })
        .trim()
        .regex(phoneRegex, 'Invalid mobile number. Please provide a valid 10-digit Indian phone number')
        .transform((val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length === 10 ? `+91${digits}` : `+${digits}`;
    }),
});
exports.verifyOtpSchema = zod_1.z.object({
    phone: zod_1.z
        .string({ required_error: 'Phone number is required' })
        .trim()
        .regex(phoneRegex, 'Invalid mobile number')
        .transform((val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length === 10 ? `+91${digits}` : `+${digits}`;
    }),
    otp: zod_1.z
        .string({ required_error: 'OTP is required' })
        .trim()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain numbers only'),
    name: zod_1.z.string().trim().max(100).optional(),
    businessName: zod_1.z.string().trim().max(150).optional(),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }).min(1),
});
//# sourceMappingURL=auth.validator.js.map