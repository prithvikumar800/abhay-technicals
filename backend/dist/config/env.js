"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.string().default('5000').transform((val) => parseInt(val, 10)),
    API_PREFIX: zod_1.z.string().default('/api/v1'),
    CORS_ORIGIN: zod_1.z.string().default('http://localhost:3000,http://localhost:3001'),
    DATABASE_URL: zod_1.z.string().default('mysql://root:@localhost:3306/abhay_technicals_dev'),
    JWT_ACCESS_SECRET: zod_1.z.string().default('dev_jwt_access_secret_super_secure_key_12345'),
    JWT_REFRESH_SECRET: zod_1.z.string().default('dev_jwt_refresh_secret_super_secure_key_67890'),
    JWT_ACCESS_EXPIRY: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRY: zod_1.z.string().default('30d'),
    // Provider Flags
    USE_MOCK_PROVIDERS: zod_1.z.string().default('true').transform((val) => val === 'true'),
    // WhatsApp Cloud API
    WHATSAPP_API_URL: zod_1.z.string().optional(),
    WHATSAPP_PHONE_NUMBER_ID: zod_1.z.string().optional(),
    WHATSAPP_ACCESS_TOKEN: zod_1.z.string().optional(),
    // Payments
    RAZORPAY_KEY_ID: zod_1.z.string().optional(),
    RAZORPAY_KEY_SECRET: zod_1.z.string().optional(),
    CASHFREE_APP_ID: zod_1.z.string().optional(),
    CASHFREE_SECRET_KEY: zod_1.z.string().optional(),
    // Logistics
    DELHIVERY_API_KEY: zod_1.z.string().optional(),
    DELHIVERY_BASE_URL: zod_1.z.string().default('https://track.delhivery.com'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Environment configuration error:', parsed.error.format());
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map