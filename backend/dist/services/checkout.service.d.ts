import { CartService, CalculatedCart } from './cart.service.js';
import { ShippingProvider, PincodeServiceabilityResult } from '../lib/providers/shipping.provider.js';
import { AuthenticatedUser } from '../types/index.js';
export interface CheckoutValidationResult {
    isValid: boolean;
    cart: CalculatedCart;
    shipping: PincodeServiceabilityResult;
    pricingSummary: {
        subtotal: number;
        shippingFee: number;
        taxAmount: number;
        totalPayable: number;
    };
}
export declare class CheckoutService {
    private cartService;
    private shippingProvider;
    constructor(cartService: CartService, shippingProvider: ShippingProvider);
    validateCheckout(user: AuthenticatedUser, cartId: string, pincode: string): Promise<CheckoutValidationResult>;
}
