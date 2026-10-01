import { CartService, CalculatedCart } from './cart.service.js';
import { ShippingProvider, PincodeServiceabilityResult } from '../lib/providers/shipping.provider.js';
import { AuthenticatedUser } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.middleware.js';

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

export class CheckoutService {
  constructor(
    private cartService: CartService,
    private shippingProvider: ShippingProvider
  ) {}

  async validateCheckout(
    user: AuthenticatedUser,
    cartId: string,
    pincode: string
  ): Promise<CheckoutValidationResult> {
    // 1. Fetch current cart with live recalculation
    const cart = await this.cartService.getCart(cartId, user);

    if (cart.items.length === 0) {
      throw new AppError('Your cart is empty. Please add items to proceed.', 400, 'EMPTY_CART');
    }

    // 2. Validate live stock and availability for every single item
    for (const item of cart.items) {
      if (!item.isAvailable) {
        throw new AppError(
          `Item "${item.title}" (${item.sku}) is out of stock or insufficient quantity (Available: ${item.stockAvailable}).`,
          400,
          'INSUFFICIENT_STOCK_CHECKOUT'
        );
      }

      if (item.quantity < item.minOrderQty) {
        throw new AppError(
          `Item "${item.title}" does not meet the minimum order quantity of ${item.minOrderQty} units.`,
          400,
          'MIN_ORDER_QTY_NOT_MET'
        );
      }
    }

    // 3. Verify Pincode serviceability via Delhivery Provider
    const serviceability = await this.shippingProvider.checkPincodeServiceability(pincode);

    if (!serviceability.isServiceable) {
      throw new AppError(
        `Pincode ${pincode} is currently unserviceable for delivery by our logistics partner.`,
        400,
        'PINCODE_UNSERVICEABLE'
      );
    }

    // 4. Calculate final shipping fee & totals
    const shippingFee = cart.freeShippingEligible ? 0.0 : 49.0;
    const taxAmount = 0.0; // Assuming GST-inclusive pricing mode
    const totalPayable = cart.subtotal + shippingFee + taxAmount;

    return {
      isValid: true,
      cart,
      shipping: serviceability,
      pricingSummary: {
        subtotal: cart.subtotal,
        shippingFee,
        taxAmount,
        totalPayable,
      },
    };
  }
}
