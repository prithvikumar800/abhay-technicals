import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  DATABASE_URL: z.string().default('mysql://root:@localhost:3306/abhay_technicals_dev'),
  JWT_ACCESS_SECRET: z.string().default('dev_jwt_access_secret_super_secure_key_12345'),
  JWT_REFRESH_SECRET: z.string().default('dev_jwt_refresh_secret_super_secure_key_67890'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('30d'),
  // Provider Flags
  USE_MOCK_PROVIDERS: z.string().default('true').transform((val) => val === 'true'),
  // WhatsApp Cloud API
  WHATSAPP_API_URL: z.string().optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  // Payments
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  CASHFREE_APP_ID: z.string().optional(),
  CASHFREE_SECRET_KEY: z.string().optional(),
  // Logistics
  DELHIVERY_API_KEY: z.string().optional(),
  DELHIVERY_BASE_URL: z.string().default('https://track.delhivery.com'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Environment configuration error:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
