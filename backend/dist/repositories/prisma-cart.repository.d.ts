import { PrismaClient } from '@prisma/client';
import { CartRepository, CartEntity, CartItemEntity } from './cart.repository.js';
export declare class PrismaCartRepository implements CartRepository {
    private prisma;
    constructor(prisma?: PrismaClient);
    findOrCreateCart(userId?: string, guestSessionId?: string): Promise<CartEntity>;
    findCartById(cartId: string): Promise<CartEntity | null>;
    addItem(cartId: string, productId: string, quantity: number): Promise<CartItemEntity>;
    updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<CartItemEntity | null>;
    removeItem(cartId: string, itemId: string): Promise<boolean>;
    clearCart(cartId: string): Promise<void>;
    private mapPrismaCartToEntity;
}
