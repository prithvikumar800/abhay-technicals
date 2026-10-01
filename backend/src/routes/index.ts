import { Router } from 'express';
import { createAuthRouter } from './auth.routes.js';
import { createCatalogueRouter } from './catalogue.routes.js';
import { createCartRouter } from './cart.routes.js';
import { createCheckoutRouter } from './checkout.routes.js';
import { createOrdersRouter } from './orders.routes.js';
import {
  createPaymentsRouter,
  createShipmentsRouter,
  createUsersRouter,
  createReviewsRouter,
} from './modules.routes.js';
import { createAdminRouter } from './admin.routes.js';
import { checkHealth } from '../controllers/health.controller.js';

export function createApiRouter(): Router {
  const router = Router();

  // Health endpoint: GET /health (and also available at /api/v1/health)
  router.get('/health', checkHealth);

  // Grouped route modules under /api/v1/
  router.use('/auth', createAuthRouter());
  router.use('/', createCatalogueRouter());
  router.use('/categories', createCatalogueRouter());
  router.use('/brands', createCatalogueRouter());
  router.use('/products', createCatalogueRouter());
  router.use('/cart', createCartRouter());
  router.use('/checkout', createCheckoutRouter());
  router.use('/orders', createOrdersRouter());
  router.use('/payments', createPaymentsRouter());
  router.use('/shipments', createShipmentsRouter());
  router.use('/users', createUsersRouter());
  router.use('/reviews', createReviewsRouter());
  router.use('/admin', createAdminRouter());

  return router;
}
