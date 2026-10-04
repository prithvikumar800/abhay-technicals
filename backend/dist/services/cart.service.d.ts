import { CartRepository } from '../repositories/cart.repository.js';
import { CatalogueRepository } from '../repositories/catalogue.repository.js';
import { AuthenticatedUser } from '../types/index.js';
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
export declare class CartService {
    private cartRepo;
    private catalogueRepo;
    constructor(cartRepo: CartRepository, catalogueRepo: CatalogueRepository);
    getCart(cartId: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart>;
    getOrCreateCart(userId?: string, guestSessionId?: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart>;
    addItem(cartId: string, productId: string, quantity: number, currentUser?: AuthenticatedUser): Promise<CalculatedCart>;
    updateItem(cartId: string, itemId: string, quantity: number, currentUser?: AuthenticatedUser): Promise<CalculatedCart>;
    removeItem(cartId: string, itemId: string, currentUser?: AuthenticatedUser): Promise<CalculatedCart>;
    clearCart(cartId: string): Promise<void>;
    /**
     * Recalculates unit prices, line totals, and wholesale tier prices.
     * Client submitted prices are completely ignored and recomputed here.
     */
    private recalculateCart;
}
