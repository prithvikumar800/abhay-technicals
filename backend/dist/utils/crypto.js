"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureOtp = generateSecureOtp;
exports.hashValue = hashValue;
exports.verifyHash = verifyHash;
exports.hashToken = hashToken;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * Uses Node's crypto.randomInt to guarantee uniform randomness.
 */
function generateSecureOtp() {
    const code = crypto_1.default.randomInt(100000, 1000000);
    return code.toString();
}
/**
 * Hashes an OTP or string using Bcrypt with salt rounds = 10.
 */
async function hashValue(value) {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(value, salt);
}
/**
 * Compares a candidate plaintext value against a Bcrypt hash.
 */
async function verifyHash(value, hash) {
    return bcryptjs_1.default.compare(value, hash);
}
/**
 * Computes a fast SHA-256 hash for long-lived tokens.
 */
function hashToken(token) {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
}
//# sourceMappingURL=crypto.js.map