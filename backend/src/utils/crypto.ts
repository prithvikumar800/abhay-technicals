import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * Uses Node's crypto.randomInt to guarantee uniform randomness.
 */
export function generateSecureOtp(): string {
  const code = crypto.randomInt(100000, 1000000);
  return code.toString();
}

/**
 * Hashes an OTP or string using Bcrypt with salt rounds = 10.
 */
export async function hashValue(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
}

/**
 * Compares a candidate plaintext value against a Bcrypt hash.
 */
export async function verifyHash(value: string, hash: string): Promise<boolean> {
  return bcrypt.compare(value, hash);
}

/**
 * Computes a fast SHA-256 hash for long-lived tokens.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
