import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
export declare class AppError extends Error {
    message: string;
    statusCode: number;
    code: string;
    details?: any | undefined;
    constructor(message: string, statusCode?: number, code?: string, details?: any | undefined);
}
export declare function errorHandler(err: any, req: AuthenticatedRequest, res: Response, _next: NextFunction): void;
