"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const errorHandler_middleware_js_1 = require("../middleware/errorHandler.middleware.js");
class CartService {
    cartRepo;
    catalogueRepo;
    constructor(cartRepo, catalogueRepo) {
        this.cartRepo = cartRepo;
        this.catalogueRepo = catalogueRepo;
    }
    async getCart(cartId, currentUser) {
        const cart = await this.cartRepo.findCartById(cartId);
        if (!cart) {
            throw new errorHandler_middleware_js_1.AppError('Cart not found', 404, 'CART_NOT_FOUND');
        }
        return this.recalculateCart(cart.id, cart.items, currentUser);
    }
    async getOrCreateCart(userId, guestSessionId, currentUser) {
        const cart = await this.cartRepo.findOrCreateCart(userId, guestSessionId);
        return this.recalculateCart(cart.id, cart.items, currentUser);
    }
    async addItem(cartId, productId, quantity, currentUser) {
        const product = await this.catalogueRepo.findProductById(productId);
        if (!product || !product.isActive) {
            throw new errorHandler_middleware_js_1.AppError('Product is no longer available.', 400, 'PRODUCT_UNAVAILABLE');
        }
        if (quantity < product.minOrderQty) {
            throw new errorHandler_middleware_js_1.AppError(`Minimum order quantity for this item is ${product.minOrderQty} units.`, 400, 'MIN_ORDER_QTY_NOT_MET');
        }
        if (product.stockQty < quantity) {
            throw new errorHandler_middleware_js_1.AppError(`Requested quantity exceeds current stock. Only ${product.stockQty} available.`, 400, 'INSUFFICIENT_STOCK');
        }
        await this.cartRepo.addItem(cartId, productId, quantity);
        const cart = await this.cartRepo.findCartById(cartId);
        return this.recalculateCart(cartId, cart.items, currentUser);
    }
    async updateItem(cartId, itemId, quantity, currentUser) {
        const cart = await this.cartRepo.findCartById(cartId);
        if (!cart)
            throw new errorHandler_middleware_js_1.AppError('Cart not found', 404, 'CART_NOT_FOUND');
        const item = cart.items.find((i) => i.id === itemId);
        if (!item)
            throw new errorHandler_middleware_js_1.AppError('Item not found in cart', 404, 'ITEM_NOT_FOUND');
        const product = await this.catalogueRepo.findProductById(item.productId);
        if (!product || !product.isActive) {
            throw new errorHandler_middleware_js_1.AppError('Product is no longer available.', 400, 'PRODUCT_UNAVAILABLE');
        }
        if (quantity < product.minOrderQty) {
            throw new errorHandler_middleware_js_1.AppError(`Minimum order quantity for this item is ${product.minOrderQty} units.`, 400, 'MIN_ORDER_QTY_NOT_MET');
        }
        if (product.stockQty < quantity) {
            throw new errorHandler_middleware_js_1.AppError(`Requested quantity exceeds current stock. Only ${product.stockQty} available.`, 400, 'INSUFFICIENT_STOCK');
        }
        await this.cartRepo.updateItemQuantity(cartId, itemId, quantity);
        const updatedCart = await this.cartRepo.findCartById(cartId);
        return this.recalculateCart(cartId, updatedCart.items, currentUser);
    }
    async removeItem(cartId, itemId, currentUser) {
        await this.cartRepo.removeItem(cartId, itemId);
        const cart = await this.cartRepo.findCartById(cartId);
        return this.recalculateCart(cartId, cart?.items || [], currentUser);
    }
    async clearCart(cartId) {
        await this.cartRepo.clearCart(cartId);
    }
    /**
     * Recalculates unit prices, line totals, and wholesale tier prices.
     * Client submitted prices are completely ignored and recomputed here.
     */
    async recalculateCart(cartId, items, currentUser) {
        const calculatedItems = [];
        let subtotal = 0;
        let totalWeightGrams = 0;
        for (const item of items) {
            const product = await this.catalogueRepo.findProductById(item.productId);
            if (!product)
                continue;
            let effectiveUnitPrice = product.salePrice ?? product.retailPrice;
            let tierApplied = null;
            // Apply wholesale tier if user is authenticated (LOGIN_GATED) and tier threshold is met
            if (currentUser && product.wholesaleTiers && product.wholesaleTiers.length > 0) {
                // Sort tiers descending by minQuantity
                const sortedTiers = [...product.wholesaleTiers].sort((a, b) => b.minQuantity - a.minQuantity);
                for (const tier of sortedTiers) {
                    if (item.quantity >= tier.minQuantity) {
                        effectiveUnitPrice = tier.tierPrice;
                        tierApplied = `Wholesale Tier (≥ ${tier.minQuantity} pcs @ ₹${tier.tierPrice})`;
                        break;
                    }
                }
            }
            const lineTotal = effectiveUnitPrice * item.quantity;
            const isAvailable = product.isActive && product.stockQty >= item.quantity;
            calculatedItems.push({
                id: item.id,
                productId: product.id,
                sku: product.sku,
                title: product.title,
                quantity: item.quantity,
                unitPrice: effectiveUnitPrice,
                lineTotal,
                tierApplied,
                stockAvailable: product.stockQty,
                isAvailable,
                minOrderQty: product.minOrderQty,
                weightGrams: product.weightGrams,
            });
            subtotal += lineTotal;
            totalWeightGrams += product.weightGrams * item.quantity;
        }
        return {
            id: cartId,
            items: calculatedItems,
            itemCount: calculatedItems.reduce((acc, i) => acc + i.quantity, 0),
            subtotal,
            totalWeightGrams,
            freeShippingEligible: subtotal >= 999, // Store setting threshold
        };
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map