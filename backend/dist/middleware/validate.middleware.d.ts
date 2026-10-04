import { Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AuthenticatedRequest } from '../types/index.js';
export declare function validate(schema: ZodSchema, source?: 'body' | 'query' | 'params'): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
