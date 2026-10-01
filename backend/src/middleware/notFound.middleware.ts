import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { sendError } from '../utils/response.js';

export function notFoundHandler(req: AuthenticatedRequest, res: Response): void {
  sendError(
    res,
    `Route ${req.method} ${req.originalUrl} not found`,
    404,
    'RESOURCE_NOT_FOUND',
    undefined,
    req.id
  );
}
