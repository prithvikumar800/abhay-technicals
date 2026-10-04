"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, data, message = 'Operation successful', statusCode = 200, meta) {
    const response = {
        success: true,
        statusCode,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            ...meta,
        },
    };
    return res.status(statusCode).json(response);
}
function sendError(res, message, statusCode = 400, code = 'BAD_REQUEST', details, requestId) {
    const response = {
        success: false,
        statusCode,
        message,
        error: {
            code,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
            requestId,
        },
    };
    return res.status(statusCode).json(response);
}
//# sourceMappingURL=response.js.map