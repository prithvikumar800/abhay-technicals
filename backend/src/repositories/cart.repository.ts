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

export class InMemoryCartRepository implements CartRepository {
  private carts: Map<string, CartEntity> = new Map();

  async findOrCreateCart(userId?: string, guestSessionId?: string): Promise<CartEntity> {
    for (const cart of this.carts.values()) {
      if (userId && cart.userId === userId) return cart;
      if (!userId && guestSessionId && cart.guestSessionId === guestSessionId) return cart;
    }

    const newCart: CartEntity = {
      id: `cart_${Date.now()}`,
      userId: userId || null,
      guestSessionId: guestSessionId || null,
      items: [],
    };
    this.carts.set(newCart.id, newCart);
    return newCart;
  }

  async findCartById(cartId: string): Promise<CartEntity | null> {
    return this.carts.get(cartId) || null;
  }

  async addItem(cartId: string, productId: string, quantity: number): Promise<CartItemEntity> {
    const cart = this.carts.get(cartId);
    if (!cart) throw new Error('Cart not found');

    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      return existing;
    }

    const newItem: CartItemEntity = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      cartId,
      productId,
      quantity,
    };
    cart.items.push(newItem);
    return newItem;
  }

  async updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<CartItemEntity | null> {
    const cart = this.carts.get(cartId);
    if (!cart) return null;

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) return null;

    item.quantity = quantity;
    return item;
  }

  async removeItem(cartId: string, itemId: string): Promise<boolean> {
    const cart = this.carts.get(cartId);
    if (!cart) return false;

    const index = cart.items.findIndex((i) => i.id === itemId);
    if (index === -1) return false;

    cart.items.splice(index, 1);
    return true;
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = this.carts.get(cartId);
    if (cart) {
      cart.items = [];
    }
  }
}
