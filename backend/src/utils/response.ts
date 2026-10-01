import { Response } from 'express';
import { ApiResponse } from '../types/index.js';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Operation successful',
  statusCode = 200,
  meta?: { pagination?: any; requestId?: string }
): Response {
  const response: ApiResponse<T> = {
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

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  code = 'BAD_REQUEST',
  details?: any,
  requestId?: string
): Response {
  const response: ApiResponse = {
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
