import { z } from 'zod';
export declare const requestOtpSchema: z.ZodObject<{
    phone: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    phone: string;
}, {
    phone: string;
}>;
export declare const verifyOtpSchema: z.ZodObject<{
    phone: z.ZodEffects<z.ZodString, string, string>;
    otp: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    otp: string;
    phone: string;
    name?: string | undefined;
    businessName?: string | undefined;
}, {
    otp: string;
    phone: string;
    name?: string | undefined;
    businessName?: string | undefined;
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
