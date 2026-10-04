"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const response_js_1 = require("../utils/response.js");
class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart = async (req, res, next) => {
        try {
            const guestSessionId = req.headers['x-guest-session-id'] || undefined;
            const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
            (0, response_js_1.sendSuccess)(res, cart, 'Active cart retrieved');
        }
        catch (err) {
            next(err);
        }
    };
    addItem = async (req, res, next) => {
        try {
            const { productId, quantity } = req.body;
            const guestSessionId = req.headers['x-guest-session-id'] || undefined;
            const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
            const updated = await this.cartService.addItem(cart.id, productId, quantity, req.user);
            (0, response_js_1.sendSuccess)(res, updated, 'Item added to cart', 201);
        }
        catch (err) {
            next(err);
        }
    };
    updateItem = async (req, res, next) => {
        try {
            const { id: itemId } = req.params;
            const { quantity } = req.body;
            const guestSessionId = req.headers['x-guest-session-id'] || undefined;
            const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
            const updated = await this.cartService.updateItem(cart.id, itemId, quantity, req.user);
            (0, response_js_1.sendSuccess)(res, updated, 'Cart item updated');
        }
        catch (err) {
            next(err);
        }
    };
    removeItem = async (req, res, next) => {
        try {
            const { id: itemId } = req.params;
            const guestSessionId = req.headers['x-guest-session-id'] || undefined;
            const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
            const updated = await this.cartService.removeItem(cart.id, itemId, req.user);
            (0, response_js_1.sendSuccess)(res, updated, 'Item removed from cart');
        }
        catch (err) {
            next(err);
        }
    };
    clearCart = async (req, res, next) => {
        try {
            const guestSessionId = req.headers['x-guest-session-id'] || undefined;
            const cart = await this.cartService.getOrCreateCart(req.user?.id, guestSessionId, req.user);
            await this.cartService.clearCart(cart.id);
            (0, response_js_1.sendSuccess)(res, { cleared: true }, 'Cart cleared');
        }
        catch (err) {
            next(err);
        }
    };
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map