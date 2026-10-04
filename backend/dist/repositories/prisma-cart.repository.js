"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCartRepository = void 0;
const prisma_js_1 = require("../lib/prisma.js");
class PrismaCartRepository {
    prisma;
    constructor(prisma = prisma_js_1.prisma) {
        this.prisma = prisma;
    }
    async findOrCreateCart(userId, guestSessionId) {
        let cart = null;
        if (userId) {
            cart = await this.prisma.cart.findUnique({
                where: { userId },
                include: { items: true },
            });
        }
        else if (guestSessionId) {
            cart = await this.prisma.cart.findUnique({
                where: { guestSessionId },
                include: { items: true },
            });
        }
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId: userId || null,
                    guestSessionId: guestSessionId || null,
                },
                include: { items: true },
            });
        }
        return this.mapPrismaCartToEntity(cart);
    }
    async findCartById(cartId) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true },
        });
        return cart ? this.mapPrismaCartToEntity(cart) : null;
    }
    async addItem(cartId, productId, quantity) {
        const existing = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId,
                    productId,
                },
            },
        });
        if (existing) {
            const updated = await this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
            return {
                id: updated.id,
                cartId: updated.cartId,
                productId: updated.productId,
                quantity: updated.quantity,
            };
        }
        const created = await this.prisma.cartItem.create({
            data: {
                cartId,
                productId,
                quantity,
            },
        });
        return {
            id: created.id,
            cartId: created.cartId,
            productId: created.productId,
            quantity: created.quantity,
        };
    }
    async updateItemQuantity(cartId, itemId, quantity) {
        try {
            const updated = await this.prisma.cartItem.update({
                where: { id: itemId, cartId },
                data: { quantity },
            });
            return {
                id: updated.id,
                cartId: updated.cartId,
                productId: updated.productId,
                quantity: updated.quantity,
            };
        }
        catch {
            return null;
        }
    }
    async removeItem(cartId, itemId) {
        try {
            await this.prisma.cartItem.delete({
                where: { id: itemId, cartId },
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async clearCart(cartId) {
        await this.prisma.cartItem.deleteMany({
            where: { cartId },
        });
    }
    mapPrismaCartToEntity(cart) {
        return {
            id: cart.id,
            userId: cart.userId,
            guestSessionId: cart.guestSessionId,
            items: (cart.items || []).map((i) => ({
                id: i.id,
                cartId: i.cartId,
                productId: i.productId,
                quantity: i.quantity,
            })),
        };
    }
}
exports.PrismaCartRepository = PrismaCartRepository;
//# sourceMappingURL=prisma-cart.repository.js.map