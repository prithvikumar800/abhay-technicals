import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.service.js';
import { PrismaOrderRepository } from '../repositories/prisma-order.repository.js';
import { PrismaCartRepository } from '../repositories/prisma-cart.repository.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { CartService } from '../services/cart.service.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createOrderSchema,
  cancelOrderSchema,
  orderQuerySchema,
} from '../validators/order.validator.js';
import { prisma } from '../lib/prisma.js';

export function createOrdersRouter(customController?: OrderController): Router {
  const router = Router();

  let controller = customController;
  if (!controller) {
    const orderRepo = new PrismaOrderRepository(prisma);
    const cartRepo = new PrismaCartRepository(prisma);
    const catalogueRepo = new PrismaCatalogueRepository(prisma);
    const cartService = new CartService(cartRepo, catalogueRepo);
    const orderService = new OrderService(orderRepo, cartService, catalogueRepo);
    controller = new OrderController(orderService);
  }

  // All order endpoints require active customer authentication
  router.use(requireAuth);

  // POST /api/v1/orders - Create new order from active cart
  router.post('/', validate(createOrderSchema, 'body'), controller.createOrder);

  // GET /api/v1/orders - Get paginated order history for authenticated customer
  router.get('/', validate(orderQuerySchema, 'query'), controller.getUserOrders);

  // GET /api/v1/orders/:id - Get specific order details by ID or orderNumber
  router.get('/:id', controller.getOrderById);

  // GET /api/v1/orders/:id/invoice - Get GST tax invoice breakdown
  router.get('/:id/invoice', controller.getOrderInvoice);

  // PATCH /api/v1/orders/:id/cancel - Cancel pending order before shipment dispatch
  router.patch('/:id/cancel', validate(cancelOrderSchema, 'body'), controller.cancelOrder);

  return router;
}
