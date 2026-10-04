/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * Uses Node's crypto.randomInt to guarantee uniform randomness.
 */
export declare function generateSecureOtp(): string;
/**
 * Hashes an OTP or string using Bcrypt with salt rounds = 10.
 */
export declare function hashValue(value: string): Promise<string>;
/**
 * Compares a candidate plaintext value against a Bcrypt hash.
 */
export declare function verifyHash(value: string, hash: string): Promise<boolean>;
/**
 * Computes a fast SHA-256 hash for long-lived tokens.
 */
export declare function hashToken(token: string): string;
