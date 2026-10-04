"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = __importDefault(require("crypto"));
function requestIdMiddleware(req, res, next) {
    const incomingId = req.headers['x-request-id'];
    const requestId = incomingId || crypto_1.default.randomUUID();
    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
}
//# sourceMappingURL=requestId.middleware.js.map