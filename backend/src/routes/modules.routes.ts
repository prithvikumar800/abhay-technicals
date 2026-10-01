import { Router, Response } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { AuthenticatedRequest } from '../types/index.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { PrismaOrderRepository } from '../repositories/prisma-order.repository.js';
import { PrismaCartRepository } from '../repositories/prisma-cart.repository.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { CartService } from '../services/cart.service.js';
import { prisma } from '../lib/prisma.js';

export function createOrdersRouter(): Router {
  const router = Router();
  const orderRepo = new PrismaOrderRepository(prisma);
  const cartService = new CartService(
    new PrismaCartRepository(prisma),
    new PrismaCatalogueRepository(prisma)
  );

  router.use(requireAuth);

  // GET /api/v1/orders - List user orders
  router.get('/', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const orders = await orderRepo.findOrdersByUser(req.user!.id);
      sendSuccess(res, { orders }, 'User order history retrieved successfully');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ORDERS');
    }
  });

  // GET /api/v1/orders/:id - Get specific order details
  router.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const order = await orderRepo.findOrderById(req.params.id);
      if (!order) {
        // Fallback search by orderNumber
        const byNum = await orderRepo.findOrderByNumber(req.params.id);
        if (!byNum) {
          sendError(res, 'Order not found', 404, 'ORDER_NOT_FOUND');
          return;
        }
        sendSuccess(res, byNum, 'Order details retrieved successfully');
        return;
      }
      sendSuccess(res, order, 'Order details retrieved successfully');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ORDER');
    }
  });

  // POST /api/v1/orders - Create new order from cart / checkout
  router.post('/', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const body = req.body;
      const user = req.user!;

      // Retrieve user active cart to ensure backend pricing authority
      const cart = await cartService.getOrCreateCart(user.id, undefined, user);

      if (cart.items.length === 0) {
        sendError(res, 'Cannot place an order with an empty cart', 400, 'CART_EMPTY');
        return;
      }

      // 1. Calculate backend-authoritative pricing (subtotal, shipping, totals)
      const subtotal = cart.subtotal;
      const freeShippingThreshold = 999.0;
      const standardShippingFee = 49.0;
      const shippingFee = subtotal >= freeShippingThreshold ? 0.0 : standardShippingFee;
      const taxAmount = 0.0; // Inclusive GST
      const totalAmount = subtotal + shippingFee;

      const orderNumber = `AT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const addressData = body.address || {
        name: user.phone,
        phone: user.phone,
        addressLine1: 'Gaffar Market, Karol Bagh',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: body.shippingPincode || '110005',
      };

      const order = await orderRepo.createOrder({
        userId: user.id,
        orderNumber,
        subtotal,
        shippingFee,
        taxAmount,
        totalAmount,
        customerNotes: body.customerNotes,
        address: addressData,
        items: cart.items.map((i) => ({
          productId: i.productId,
          sku: i.sku,
          productTitle: i.title,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.lineTotal,
          tierApplied: i.tierApplied || undefined,
        })),
      });

      // 2. Generate a mock Delhivery shipment & AWB
      const awbCode = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
      await orderRepo.createMockShipment(order.id, awbCode);

      // 3. Clear user's cart after successful order creation
      await cartService.clearCart(cart.id);

      const createdOrder = await orderRepo.findOrderById(order.id);
      sendSuccess(res, createdOrder, 'Order created successfully with tracking AWB generated', 201);
    } catch (err: any) {
      sendError(res, err.message, 500, 'ORDER_CREATION_FAILED');
    }
  });

  return router;
}

export function createPaymentsRouter(): Router {
  const router = Router();

  // POST /api/v1/payments/webhook - Webhook listener
  router.post('/webhook', (_req: AuthenticatedRequest, res: Response) => {
    sendSuccess(res, { received: true }, 'Webhook received successfully');
  });

  return router;
}

export function createShipmentsRouter(): Router {
  const router = Router();
  const orderRepo = new PrismaOrderRepository(prisma);

  // GET /api/v1/shipments/track/:awb - Public parcel tracking
  router.get('/track/:awb', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const shipment = await orderRepo.findShipmentByAwb(req.params.awb);
      if (!shipment) {
        // Fallback for mock demo numbers
        sendSuccess(
          res,
          {
            awb: req.params.awb,
            courier: 'Delhivery Surface Express',
            status: 'IN_TRANSIT',
            trackingEvents: [
              { milestone: 'MANIFEST_CREATED', location: 'Delhi Hub', eventTimestamp: new Date() },
              { milestone: 'IN_TRANSIT', location: 'Regional Hub', eventTimestamp: new Date() },
            ],
          },
          'Tracking details retrieved'
        );
        return;
      }
      sendSuccess(res, shipment, 'Tracking details retrieved successfully');
    } catch (err: any) {
      sendError(res, err.message, 500, 'TRACKING_FAILED');
    }
  });

  return router;
}

export function createUsersRouter(): Router {
  const router = Router();
  router.use(requireAuth);

  // GET /api/v1/users/addresses - Get saved delivery addresses
  router.get('/addresses', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const addresses = await prisma.userAddress.findMany({
        where: { userId: req.user!.id },
      });
      sendSuccess(res, { addresses }, 'Saved delivery addresses retrieved');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ADDRESSES');
    }
  });

  return router;
}

export function createReviewsRouter(): Router {
  const router = Router();

  // GET /api/v1/reviews/product/:productId - Public reviews for a product
  router.get('/product/:productId', async (req: AuthenticatedRequest, res: Response) => {
    try {
      const reviews = await prisma.review.findMany({
        where: { productId: req.params.productId, status: 'APPROVED' },
      });
      sendSuccess(res, { reviews }, 'Product reviews retrieved');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_REVIEWS');
    }
  });

  return router;
}
