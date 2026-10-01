import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CheckoutService } from '../services/checkout.service.js';
import { CartService } from '../services/cart.service.js';
import { sendSuccess } from '../utils/response.js';

export class CheckoutController {
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {}

  validateCheckout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { shippingPincode } = req.body;
    const cart = await this.cartService.getOrCreateCart(req.user!.id, undefined, req.user);
    const result = await this.checkoutService.validateCheckout(req.user!, cart.id, shippingPincode);
    sendSuccess(res, result, 'Checkout validation successful');
  };
}
