import { Response } from 'express';
export declare function sendSuccess<T>(res: Response, data: T, message?: string, statusCode?: number, meta?: {
    pagination?: any;
    requestId?: string;
}): Response;
export declare function sendError(res: Response, message: string, statusCode?: number, code?: string, details?: any, requestId?: string): Response;
