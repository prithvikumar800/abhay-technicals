"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = createAuthRouter;
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const auth_service_js_1 = require("../services/auth.service.js");
const prisma_auth_repository_js_1 = require("../repositories/prisma-auth.repository.js");
const auth_repository_js_1 = require("../repositories/auth.repository.js");
const whatsapp_provider_js_1 = require("../lib/providers/whatsapp.provider.js");
const validate_middleware_js_1 = require("../middleware/validate.middleware.js");
const auth_validator_js_1 = require("../validators/auth.validator.js");
const rateLimiter_middleware_js_1 = require("../middleware/rateLimiter.middleware.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
function createAuthRouter(authService) {
    const router = (0, express_1.Router)();
    const repo = process.env.DATABASE_URL
        ? new prisma_auth_repository_js_1.PrismaAuthRepository()
        : new auth_repository_js_1.InMemoryAuthRepository();
    const service = authService ||
        new auth_service_js_1.AuthService(repo, new whatsapp_provider_js_1.MockWhatsAppProvider());
    const controller = new auth_controller_js_1.AuthController(service);
    // POST /api/v1/auth/request-otp (Strictly rate-limited)
    router.post('/request-otp', rateLimiter_middleware_js_1.authOtpRateLimiter, (0, validate_middleware_js_1.validate)(auth_validator_js_1.requestOtpSchema, 'body'), controller.requestOtp);
    // POST /api/v1/auth/verify-otp
    router.post('/verify-otp', (0, validate_middleware_js_1.validate)(auth_validator_js_1.verifyOtpSchema, 'body'), controller.verifyOtp);
    // POST /api/v1/auth/refresh
    router.post('/refresh', (0, validate_middleware_js_1.validate)(auth_validator_js_1.refreshTokenSchema, 'body'), controller.refreshToken);
    // POST /api/v1/auth/refresh-token (alias for mobile client compatibility)
    router.post('/refresh-token', (0, validate_middleware_js_1.validate)(auth_validator_js_1.refreshTokenSchema, 'body'), controller.refreshToken);
    // POST /api/v1/auth/logout
    router.post('/logout', controller.logout);
    // GET /api/v1/auth/me (Protected)
    router.get('/me', auth_middleware_js_1.requireAuth, controller.getProfile);
    return router;
}
//# sourceMappingURL=auth.routes.js.map