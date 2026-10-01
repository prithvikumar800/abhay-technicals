import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { AdminController } from '../controllers/admin.controller.js';

export function createAdminRouter(adminController?: AdminController): Router {
  const router = Router();
  const controller = adminController || new AdminController();

  // Protect all admin endpoints: Must be authenticated and have ADMIN or STAFF role
  router.use(requireAuth);
  router.use(requireRole('ADMIN', 'STAFF'));

  // Metrics
  router.get('/dashboard/stats', controller.getDashboardStats);

  // Products CRUD
  router.get('/products', controller.getProducts);
  router.post('/products', controller.createProduct);
  router.patch('/products/:id', controller.updateProduct);
  router.delete('/products/:id', controller.deleteProduct);

  // Orders
  router.get('/orders', controller.getOrders);
  router.get('/orders/:id', controller.getOrderById);
  router.patch('/orders/:id/status', controller.updateOrderStatus);

  return router;
}
