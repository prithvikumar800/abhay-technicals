export interface CartItemEntity {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
}
export interface CartEntity {
    id: string;
    userId?: string | null;
    guestSessionId?: string | null;
    items: CartItemEntity[];
}
export interface CartRepository {
    findOrCreateCart(userId?: string, guestSessionId?: string): Promise<CartEntity>;
    findCartById(cartId: string): Promise<CartEntity | null>;
    addItem(cartId: string, productId: string, quantity: number): Promise<CartItemEntity>;
    updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<CartItemEntity | null>;
    removeItem(cartId: string, itemId: string): Promise<boolean>;
    clearCart(cartId: string): Promise<void>;
}
export declare class InMemoryCartRepository implements CartRepository {
    private carts;
    findOrCreateCart(userId?: string, guestSessionId?: string): Promise<CartEntity>;
    findCartById(cartId: string): Promise<CartEntity | null>;
    addItem(cartId: string, productId: string, quantity: number): Promise<CartItemEntity>;
    updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<CartItemEntity | null>;
    removeItem(cartId: string, itemId: string): Promise<boolean>;
    clearCart(cartId: string): Promise<void>;
}
