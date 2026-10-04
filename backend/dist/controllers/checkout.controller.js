"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const response_js_1 = require("../utils/response.js");
class CheckoutController {
    checkoutService;
    cartService;
    constructor(checkoutService, cartService) {
        this.checkoutService = checkoutService;
        this.cartService = cartService;
    }
    validateCheckout = async (req, res) => {
        const { shippingPincode } = req.body;
        const cart = await this.cartService.getOrCreateCart(req.user.id, undefined, req.user);
        const result = await this.checkoutService.validateCheckout(req.user, cart.id, shippingPincode);
        (0, response_js_1.sendSuccess)(res, result, 'Checkout validation successful');
    };
}
exports.CheckoutController = CheckoutController;
//# sourceMappingURL=checkout.controller.js.map