import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CheckoutService } from '../services/checkout.service.js';
import { CartService } from '../services/cart.service.js';
export declare class CheckoutController {
    private checkoutService;
    private cartService;
    constructor(checkoutService: CheckoutService, cartService: CartService);
    validateCheckout: (req: AuthenticatedRequest, res: Response) => Promise<void>;
}
