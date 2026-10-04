"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOtpRateLimiter = exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const response_js_1 = require("../utils/response.js");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 120, // 120 requests per minute per IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) => {
        (0, response_js_1.sendError)(res, 'Too many requests. Please slow down.', 429, 'RATE_LIMIT_EXCEEDED');
    },
});
exports.authOtpRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour window
    limit: 5, // Maximum 5 OTP requests per hour per IP/Device
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) => {
        (0, response_js_1.sendError)(res, 'Maximum OTP request threshold reached. Please wait an hour before requesting again.', 429, 'OTP_RATE_LIMIT_EXCEEDED');
    },
});
//# sourceMappingURL=rateLimiter.middleware.js.map