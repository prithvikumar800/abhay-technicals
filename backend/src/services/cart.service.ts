import { CartRepository } from '../repositories/cart.repository.js';
import { CatalogueRepository } from '../repositories/catalogue.repository.js';
import { AuthenticatedUser } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.middleware.js';

export interface CalculatedCartItem {
  id: string;
  productId: string;
  sku: string;
  title: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  tierApplied?: string | null;
  stockAvailable: number;
  isAvailable: boolean;
  minOrderQty: number;
  weightGrams: number;
}

export interface CalculatedCart {
  id: string;
  items: CalculatedCartItem[];
  itemCount: number;
  subtotal: number;
  totalWeightGrams: number;
  freeShippingEligible: boolean;
}

export class CartService {
  constructor(
    private cartRepo: CartRepository,
    private catalogueRepo: CatalogueRepository
  ) {}

  async getCart(cartId: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart> {
    const cart = await this.cartRepo.findCartById(cartId);
    if (!cart) {
      throw new AppError('Cart not found', 404, 'CART_NOT_FOUND');
    }

    return this.recalculateCart(cart.id, cart.items, currentUser);
  }

  async getOrCreateCart(userId?: string, guestSessionId?: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart> {
    const cart = await this.cartRepo.findOrCreateCart(userId, guestSessionId);
    return this.recalculateCart(cart.id, cart.items, currentUser);
  }

  async addItem(cartId: string, productId: string, quantity: number, currentUser?: AuthenticatedUser): Promise<CalculatedCart> {
    const product = await this.catalogueRepo.findProductById(productId);
    if (!product || !product.isActive) {
      throw new AppError('Product is no longer available.', 400, 'PRODUCT_UNAVAILABLE');
    }

    if (quantity < product.minOrderQty) {
      throw new AppError(
        `Minimum order quantity for this item is ${product.minOrderQty} units.`,
        400,
        'MIN_ORDER_QTY_NOT_MET'
      );
    }

    if (product.stockQty < quantity) {
      throw new AppError(
        `Requested quantity exceeds current stock. Only ${product.stockQty} available.`,
        400,
        'INSUFFICIENT_STOCK'
      );
    }

    await this.cartRepo.addItem(cartId, productId, quantity);
    const cart = await this.cartRepo.findCartById(cartId);
    return this.recalculateCart(cartId, cart!.items, currentUser);
  }

  async updateItem(cartId: string, itemId: string, quantity: number, currentUser?: AuthenticatedUser): Promise<CalculatedCart> {
    const cart = await this.cartRepo.findCartById(cartId);
    if (!cart) throw new AppError('Cart not found', 404, 'CART_NOT_FOUND');

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new AppError('Item not found in cart', 404, 'ITEM_NOT_FOUND');

    const product = await this.catalogueRepo.findProductById(item.productId);
    if (!product || !product.isActive) {
      throw new AppError('Product is no longer available.', 400, 'PRODUCT_UNAVAILABLE');
    }

    if (quantity < product.minOrderQty) {
      throw new AppError(
        `Minimum order quantity for this item is ${product.minOrderQty} units.`,
        400,
        'MIN_ORDER_QTY_NOT_MET'
      );
    }

    if (product.stockQty < quantity) {
      throw new AppError(
        `Requested quantity exceeds current stock. Only ${product.stockQty} available.`,
        400,
        'INSUFFICIENT_STOCK'
      );
    }

    await this.cartRepo.updateItemQuantity(cartId, itemId, quantity);
    const updatedCart = await this.cartRepo.findCartById(cartId);
    return this.recalculateCart(cartId, updatedCart!.items, currentUser);
  }

  async removeItem(cartId: string, itemId: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart> {
    await this.cartRepo.removeItem(cartId, itemId);
    const cart = await this.cartRepo.findCartById(cartId);
    return this.recalculateCart(cartId, cart?.items || [], currentUser);
  }

  async clearCart(cartId: string): Promise<void> {
    await this.cartRepo.clearCart(cartId);
  }

  /**
   * Recalculates unit prices, line totals, and wholesale tier prices.
   * Client submitted prices are completely ignored and recomputed here.
   */
  private async recalculateCart(
    cartId: string,
    items: { id: string; productId: string; quantity: number }[],
    currentUser?: AuthenticatedUser
  ): Promise<CalculatedCart> {
    const calculatedItems: CalculatedCartItem[] = [];
    let subtotal = 0;
    let totalWeightGrams = 0;

    for (const item of items) {
      const product = await this.catalogueRepo.findProductById(item.productId);
      if (!product) continue;

      let effectiveUnitPrice = product.salePrice ?? product.retailPrice;
      let tierApplied: string | null = null;

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
