"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.createApp = createApp;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const env_js_1 = require("./config/env.js");
const logger_js_1 = require("./utils/logger.js");
const requestId_middleware_js_1 = require("./middleware/requestId.middleware.js");
const rateLimiter_middleware_js_1 = require("./middleware/rateLimiter.middleware.js");
const notFound_middleware_js_1 = require("./middleware/notFound.middleware.js");
const errorHandler_middleware_js_1 = require("./middleware/errorHandler.middleware.js");
const health_controller_js_1 = require("./controllers/health.controller.js");
const index_js_1 = require("./routes/index.js");
function createApp() {
    const app = (0, express_1.default)();
    // 1. Security Headers via Helmet
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: env_js_1.env.NODE_ENV === 'production',
        crossOriginEmbedderPolicy: false,
    }));
    // 2. Strict CORS Configuration
    const allowedOrigins = env_js_1.env.CORS_ORIGIN.split(',').map((o) => o.trim());
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            // Allow mobile apps (no origin header) and whitelisted web origins
            if (!origin || allowedOrigins.includes(origin) || env_js_1.env.NODE_ENV === 'development') {
                callback(null, true);
            }
            else {
                callback(new Error('Blocked by CORS policy'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'X-Guest-Session-Id'],
    }));
    // 3. Request Correlation ID & JSON Parser
    app.use(requestId_middleware_js_1.requestIdMiddleware);
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
    // 4. Global Rate Limiter
    app.use(rateLimiter_middleware_js_1.globalRateLimiter);
    // 5. Health Check (Root level)
    app.get('/health', health_controller_js_1.checkHealth);
    // 6. REST API v1 Routes
    app.use(env_js_1.env.API_PREFIX, (0, index_js_1.createApiRouter)());
    // 7. Unmatched Route Handler (404)
    app.use(notFound_middleware_js_1.notFoundHandler);
    // 8. Global Error Handler
    app.use(errorHandler_middleware_js_1.errorHandler);
    return app;
}
exports.app = createApp();
function startServer() {
    const server = exports.app.listen(env_js_1.env.PORT, () => {
        logger_js_1.logger.info({
            event: 'SERVER_STARTUP',
            port: env_js_1.env.PORT,
            env: env_js_1.env.NODE_ENV,
            apiPrefix: env_js_1.env.API_PREFIX,
            message: `Abhay Technicals API Server running on port ${env_js_1.env.PORT}`,
        });
    });
    return server;
}
// Auto-start only when directly executed and not in test environment
if (process.env.NODE_ENV !== 'test' && !process.env.CI_TEST) {
    startServer();
}
//# sourceMappingURL=server.js.map