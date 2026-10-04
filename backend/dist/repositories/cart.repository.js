"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCartRepository = void 0;
class InMemoryCartRepository {
    carts = new Map();
    async findOrCreateCart(userId, guestSessionId) {
        for (const cart of this.carts.values()) {
            if (userId && cart.userId === userId)
                return cart;
            if (!userId && guestSessionId && cart.guestSessionId === guestSessionId)
                return cart;
        }
        const newCart = {
            id: `cart_${Date.now()}`,
            userId: userId || null,
            guestSessionId: guestSessionId || null,
            items: [],
        };
        this.carts.set(newCart.id, newCart);
        return newCart;
    }
    async findCartById(cartId) {
        return this.carts.get(cartId) || null;
    }
    async addItem(cartId, productId, quantity) {
        const cart = this.carts.get(cartId);
        if (!cart)
            throw new Error('Cart not found');
        const existing = cart.items.find((i) => i.productId === productId);
        if (existing) {
            existing.quantity += quantity;
            return existing;
        }
        const newItem = {
            id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            cartId,
            productId,
            quantity,
        };
        cart.items.push(newItem);
        return newItem;
    }
    async updateItemQuantity(cartId, itemId, quantity) {
        const cart = this.carts.get(cartId);
        if (!cart)
            return null;
        const item = cart.items.find((i) => i.id === itemId);
        if (!item)
            return null;
        item.quantity = quantity;
        return item;
    }
    async removeItem(cartId, itemId) {
        const cart = this.carts.get(cartId);
        if (!cart)
            return false;
        const index = cart.items.findIndex((i) => i.id === itemId);
        if (index === -1)
            return false;
        cart.items.splice(index, 1);
        return true;
    }
    async clearCart(cartId) {
        const cart = this.carts.get(cartId);
        if (cart) {
            cart.items = [];
        }
    }
}
exports.InMemoryCartRepository = InMemoryCartRepository;
//# sourceMappingURL=cart.repository.js.map