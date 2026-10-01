import { PrismaClient } from '@prisma/client';
import {
  CartRepository,
  CartEntity,
  CartItemEntity,
} from './cart.repository.js';
import { prisma as defaultPrisma } from '../lib/prisma.js';

export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaClient = defaultPrisma) {}

  async findOrCreateCart(
    userId?: string,
    guestSessionId?: string
  ): Promise<CartEntity> {
    let cart = null;

    if (userId) {
      cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });
    } else if (guestSessionId) {
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

  async findCartById(cartId: string): Promise<CartEntity | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
    return cart ? this.mapPrismaCartToEntity(cart) : null;
  }

  async addItem(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItemEntity> {
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

  async updateItemQuantity(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<CartItemEntity | null> {
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
    } catch {
      return null;
    }
  }

  async removeItem(cartId: string, itemId: string): Promise<boolean> {
    try {
      await this.prisma.cartItem.delete({
        where: { id: itemId, cartId },
      });
      return true;
    } catch {
      return false;
    }
  }

  async clearCart(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  private mapPrismaCartToEntity(cart: any): CartEntity {
    return {
      id: cart.id,
      userId: cart.userId,
      guestSessionId: cart.guestSessionId,
      items: (cart.items || []).map((i: any) => ({
        id: i.id,
        cartId: i.cartId,
        productId: i.productId,
        quantity: i.quantity,
      })),
    };
  }
}
