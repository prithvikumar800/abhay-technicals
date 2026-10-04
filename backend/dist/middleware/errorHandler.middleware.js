"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
const response_js_1 = require("../utils/response.js");
const logger_js_1 = require("../utils/logger.js");
const env_js_1 = require("../config/env.js");
class AppError extends Error {
    message;
    statusCode;
    code;
    details;
    constructor(message, statusCode = 400, code = 'APP_ERROR', details) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
function errorHandler(err, req, res, _next) {
    const requestId = req.id;
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    logger_js_1.logger.error({
        requestId,
        error: err.message,
        stack: env_js_1.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.originalUrl,
        method: req.method,
    });
    const message = statusCode === 500 && env_js_1.env.NODE_ENV === 'production'
        ? 'An unexpected internal error occurred. Please try again later.'
        : err.message || 'Internal server error';
    (0, response_js_1.sendError)(res, message, statusCode, code, err.details, requestId);
}
//# sourceMappingURL=errorHandler.middleware.js.map