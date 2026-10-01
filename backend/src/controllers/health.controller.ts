import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response.js';

export function checkHealth(_req: Request, res: Response): void {
  const healthData = {
    status: 'healthy',
    service: 'abhay-technicals-api',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  sendSuccess(res, healthData, 'Service is operational', 200);
}
