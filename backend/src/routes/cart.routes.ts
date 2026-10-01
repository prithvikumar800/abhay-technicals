import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { CartService } from '../services/cart.service.js';
import { PrismaCartRepository } from '../repositories/prisma-cart.repository.js';
import { InMemoryCartRepository } from '../repositories/cart.repository.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { InMemoryCatalogueRepository } from '../repositories/catalogue.repository.js';
import { validate } from '../middleware/validate.middleware.js';
import { addToCartSchema, updateCartItemSchema } from '../validators/cart.validator.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

export function createCartRouter(
  cartService?: CartService
): Router {
  const router = Router();
  const cartRepo = process.env.DATABASE_URL
    ? new PrismaCartRepository()
    : new InMemoryCartRepository();
  const catalogueRepo = process.env.DATABASE_URL
    ? new PrismaCatalogueRepository()
    : new InMemoryCatalogueRepository();

  const service =
    cartService ||
    new CartService(cartRepo, catalogueRepo);
  const controller = new CartController(service);

  // All cart operations support both guest sessions and authenticated users
  router.use(optionalAuth);

  // GET /api/v1/cart
  router.get('/', controller.getCart);

  // POST /api/v1/cart/items
  router.post('/items', validate(addToCartSchema, 'body'), controller.addItem);

  // PATCH /api/v1/cart/items/:id
  router.patch('/items/:id', validate(updateCartItemSchema, 'body'), controller.updateItem);

  // DELETE /api/v1/cart/items/:id
  router.delete('/items/:id', controller.removeItem);

  // DELETE /api/v1/cart
  router.delete('/', controller.clearCart);

  return router;
}
