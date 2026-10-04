"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.optionalAuth = optionalAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const response_js_1 = require("../utils/response.js");
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        (0, response_js_1.sendError)(res, 'Authentication required. Bearer token missing.', 401, 'UNAUTHORIZED', undefined, req.id);
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_ACCESS_SECRET);
        req.user = {
            id: decoded.userId,
            phone: decoded.phone,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            (0, response_js_1.sendError)(res, 'Access token expired. Please refresh your session.', 401, 'TOKEN_EXPIRED', undefined, req.id);
            return;
        }
        (0, response_js_1.sendError)(res, 'Invalid access token.', 401, 'INVALID_TOKEN', undefined, req.id);
    }
}
/**
 * Optional authentication: Attaches user if valid Bearer token is provided,
 * but allows unauthenticated access to proceed (e.g. for catalogue browsing).
 */
function optionalAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_ACCESS_SECRET);
        req.user = {
            id: decoded.userId,
            phone: decoded.phone,
            role: decoded.role,
        };
    }
    catch {
        // Silently continue as unauthenticated guest
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map