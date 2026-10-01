import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { sendError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = 400,
    public code = 'APP_ERROR',
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: any,
  req: AuthenticatedRequest,
  res: Response,
  _next: NextFunction
): void {
  const requestId = req.id;
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  logger.error({
    requestId,
    error: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method,
  });

  const message =
    statusCode === 500 && env.NODE_ENV === 'production'
      ? 'An unexpected internal error occurred. Please try again later.'
      : err.message || 'Internal server error';

  sendError(res, message, statusCode, code, err.details, requestId);
}
