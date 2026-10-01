import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CartService } from '../services/cart.service.js';
import { sendSuccess } from '../utils/response.js';

export class CartController {
  constructor(private cartService: CartService) {}

  getCart = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const guestSessionId = (req.headers['x-guest-session-id'] as string) || undefined;
      const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
      sendSuccess(res, cart, 'Active cart retrieved');
    } catch (err) {
      next(err);
    }
  };

  addItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId, quantity } = req.body;
      const guestSessionId = (req.headers['x-guest-session-id'] as string) || undefined;
      const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
      const updated = await this.cartService.addItem(cart.id, productId, quantity, req.user);
      sendSuccess(res, updated, 'Item added to cart', 201);
    } catch (err) {
      next(err);
    }
  };

  updateItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: itemId } = req.params;
      const { quantity } = req.body;
      const guestSessionId = (req.headers['x-guest-session-id'] as string) || undefined;
      const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
      const updated = await this.cartService.updateItem(cart.id, itemId, quantity, req.user);
      sendSuccess(res, updated, 'Cart item updated');
    } catch (err) {
      next(err);
    }
  };

  removeItem = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: itemId } = req.params;
      const guestSessionId = (req.headers['x-guest-session-id'] as string) || undefined;
      const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
      const updated = await this.cartService.removeItem(cart.id, itemId, req.user);
      sendSuccess(res, updated, 'Item removed from cart');
    } catch (err) {
      next(err);
    }
  };

  clearCart = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const guestSessionId = (req.headers['x-guest-session-id'] as string) || undefined;
      const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
      await this.cartService.clearCart(cart.id);
      sendSuccess(res, { cleared: true }, 'Cart cleared');
    } catch (err) {
      next(err);
    }
  };
}
