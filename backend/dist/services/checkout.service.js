"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const errorHandler_middleware_js_1 = require("../middleware/errorHandler.middleware.js");
class CheckoutService {
    cartService;
    shippingProvider;
    constructor(cartService, shippingProvider) {
        this.cartService = cartService;
        this.shippingProvider = shippingProvider;
    }
    async validateCheckout(user, cartId, pincode) {
        // 1. Fetch current cart with live recalculation
        const cart = await this.cartService.getCart(cartId, user);
        if (cart.items.length === 0) {
            throw new errorHandler_middleware_js_1.AppError('Your cart is empty. Please add items to proceed.', 400, 'EMPTY_CART');
        }
        // 2. Validate live stock and availability for every single item
        for (const item of cart.items) {
            if (!item.isAvailable) {
                throw new errorHandler_middleware_js_1.AppError(`Item "${item.title}" (${item.sku}) is out of stock or insufficient quantity (Available: ${item.stockAvailable}).`, 400, 'INSUFFICIENT_STOCK_CHECKOUT');
            }
            if (item.quantity < item.minOrderQty) {
                throw new errorHandler_middleware_js_1.AppError(`Item "${item.title}" does not meet the minimum order quantity of ${item.minOrderQty} units.`, 400, 'MIN_ORDER_QTY_NOT_MET');
            }
        }
        // 3. Verify Pincode serviceability via Delhivery Provider
        const serviceability = await this.shippingProvider.checkPincodeServiceability(pincode);
        if (!serviceability.isServiceable) {
            throw new errorHandler_middleware_js_1.AppError(`Pincode ${pincode} is currently unserviceable for delivery by our logistics partner.`, 400, 'PINCODE_UNSERVICEABLE');
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
exports.CheckoutService = CheckoutService;
//# sourceMappingURL=checkout.service.js.map