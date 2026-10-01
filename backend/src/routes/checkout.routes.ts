import { Router, Response } from 'express';
import { CheckoutController } from '../controllers/checkout.controller.js';
import { CheckoutService } from '../services/checkout.service.js';
import { CartService } from '../services/cart.service.js';
import { PrismaCartRepository } from '../repositories/prisma-cart.repository.js';
import { InMemoryCartRepository } from '../repositories/cart.repository.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { InMemoryCatalogueRepository } from '../repositories/catalogue.repository.js';
import { PrismaOrderRepository } from '../repositories/prisma-order.repository.js';
import { MockDelhiveryProvider } from '../lib/providers/shipping.provider.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { checkoutValidateSchema } from '../validators/cart.validator.js';
import { AuthenticatedRequest } from '../types/index.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { prisma } from '../lib/prisma.js';

export function createCheckoutRouter(): Router {
  const router = Router();
  const cartRepo = process.env.DATABASE_URL
    ? new PrismaCartRepository(prisma)
    : new InMemoryCartRepository();
  const catalogueRepo = process.env.DATABASE_URL
    ? new PrismaCatalogueRepository(prisma)
    : new InMemoryCatalogueRepository();
  const orderRepo = new PrismaOrderRepository(prisma);

  const cartService = new CartService(cartRepo, catalogueRepo);
  const checkoutService = new CheckoutService(cartService, new MockDelhiveryProvider());
  const controller = new CheckoutController(checkoutService, cartService);

  // POST /api/v1/checkout/validate (Protected)
  router.post('/validate', requireAuth, validate(checkoutValidateSchema, 'body'), controller.validateCheckout);

  // POST /api/v1/checkout/process (Protected) - Alias to place order
  router.post('/process', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user!;
      const cart = await cartService.getOrCreateCart(user.id, undefined, user);

      if (cart.items.length === 0) {
        sendError(res, 'Cannot process checkout with an empty cart', 400, 'CART_EMPTY');
        return;
      }

      const subtotal = cart.subtotal;
      const freeShippingThreshold = 999.0;
      const shippingFee = subtotal >= freeShippingThreshold ? 0.0 : 49.0;
      const totalAmount = subtotal + shippingFee;
      const orderNumber = `AT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const addressData = req.body.address || {
        name: user.phone,
        phone: user.phone,
        addressLine1: req.body.addressLine1 || 'Gaffar Market, Karol Bagh',
        city: req.body.city || 'New Delhi',
        state: req.body.state || 'Delhi',
        pincode: req.body.shippingPincode || '110005',
      };

      const order = await orderRepo.createOrder({
        userId: user.id,
        orderNumber,
        subtotal,
        shippingFee,
        taxAmount: 0.0,
        totalAmount,
        customerNotes: req.body.customerNotes,
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

      const awbCode = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
      await orderRepo.createMockShipment(order.id, awbCode);
      await cartService.clearCart(cart.id);

      const createdOrder = await orderRepo.findOrderById(order.id);
      sendSuccess(res, createdOrder, 'Order processed successfully via checkout', 201);
    } catch (err: any) {
      sendError(res, err.message, 500, 'CHECKOUT_PROCESS_FAILED');
    }
  });

  return router;
}
