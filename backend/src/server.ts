import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { requestIdMiddleware } from './middleware/requestId.middleware.js';
import { globalRateLimiter } from './middleware/rateLimiter.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import { checkHealth } from './controllers/health.controller.js';
import { createApiRouter } from './routes/index.js';

export function createApp(): Express {
  const app = express();

  // 1. Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: env.NODE_ENV === 'production',
      crossOriginEmbedderPolicy: false,
    })
  );

  // 2. Strict CORS Configuration
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow mobile apps (no origin header) and whitelisted web origins
        if (!origin || allowedOrigins.includes(origin) || env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(new Error('Blocked by CORS policy'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'X-Guest-Session-Id'],
    })
  );

  // 3. Request Correlation ID & JSON Parser
  app.use(requestIdMiddleware);
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 4. Global Rate Limiter
  app.use(globalRateLimiter);

  // 5. Health Check (Root level)
  app.get('/health', checkHealth);

  // 6. REST API v1 Routes
  app.use(env.API_PREFIX, createApiRouter());

  // 7. Unmatched Route Handler (404)
  app.use(notFoundHandler);

  // 8. Global Error Handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();

export function startServer() {
  const server = app.listen(env.PORT, () => {
    logger.info({
      event: 'SERVER_STARTUP',
      port: env.PORT,
      env: env.NODE_ENV,
      apiPrefix: env.API_PREFIX,
      message: `Abhay Technicals API Server running on port ${env.PORT}`,
    });
  });
  return server;
}

// Auto-start only when directly executed and not in test environment
if (process.env.NODE_ENV !== 'test' && !process.env.CI_TEST) {
  startServer();
}
