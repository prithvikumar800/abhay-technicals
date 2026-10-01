'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorefrontProduct, CartItem } from '../types';
import { useAuth } from './auth-provider';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingProgress: number; // Percentage toward free shipping
  freeShippingThreshold: number;
  addItem: (product: StorefrontProduct, quantity?: number) => { success: boolean; message?: string };
  updateQuantity: (productId: string, quantity: number) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_MIN = 999;
const STANDARD_SHIPPING_FEE = 49;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isWholesaleAuthorized } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore cart on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('at_customer_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to storage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('at_customer_cart', JSON.stringify(items));
      } catch {
        // Ignore
      }
    }
  }, [items, isInitialized]);

  // Recalculate tier prices whenever auth state changes (LOGIN_GATED)
  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const { unitPrice, appliedTier } = computeEffectivePrice(
          item.product,
          item.quantity,
          isWholesaleAuthorized
        );
        return {
          ...item,
          unitPrice,
          appliedTier,
          lineTotal: unitPrice * item.quantity,
        };
      })
    );
  }, [isWholesaleAuthorized]);

  function computeEffectivePrice(
    product: StorefrontProduct,
    quantity: number,
    _wholesaleAuthorized?: boolean
  ): { unitPrice: number; appliedTier: string | null } {
    const basePrice = product.salePrice ?? product.retailPrice;
    let effective = basePrice;
    let tierText: string | null = null;

    const tiers =
      product.wholesaleTiers && product.wholesaleTiers.length > 0
        ? product.wholesaleTiers
        : [
            { minQuantity: 5, tierPrice: Math.round(basePrice * 0.95) },
            { minQuantity: 10, tierPrice: Math.round(basePrice * 0.9) },
          ];

    // Sort tiers descending by minQuantity
    const sortedTiers = [...tiers].sort((a, b) => b.minQuantity - a.minQuantity);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQuantity) {
        effective = tier.tierPrice;
        tierText = `Wholesale: ${tier.minQuantity}+ pcs @ ₹${tier.tierPrice.toFixed(2)}`;
        break;
      }
    }

    return { unitPrice: effective, appliedTier: tierText };
  }

  const addItem = (product: StorefrontProduct, quantity?: number): { success: boolean; message?: string } => {
    const qtyToAdd = quantity || product.minOrderQty || 1;

    // MOQ validation
    if (qtyToAdd < product.minOrderQty) {
      return {
        success: false,
        message: `Minimum order quantity for this item is ${product.minOrderQty} pcs.`,
      };
    }

    // Stock check
    if (product.stockQty <= 0) {
      return { success: false, message: 'This item is currently out of stock.' };
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQty = existing.quantity + qtyToAdd;
        const { unitPrice, appliedTier } = computeEffectivePrice(
          product,
          newQty,
          isWholesaleAuthorized
        );
        const updated = [...prev];
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          unitPrice,
          appliedTier,
          lineTotal: unitPrice * newQty,
        };
        return updated;
      } else {
        const { unitPrice, appliedTier } = computeEffectivePrice(
          product,
          qtyToAdd,
          isWholesaleAuthorized
        );
        return [
          ...prev,
          {
            product,
            quantity: qtyToAdd,
            unitPrice,
            appliedTier,
            lineTotal: unitPrice * qtyToAdd,
          },
        ];
      }
    });

    return { success: true };
  };

  const updateQuantity = (productId: string, quantity: number): { success: boolean; message?: string } => {
    const item = items.find((i) => i.product.id === productId);
    if (!item) return { success: false, message: 'Item not in cart.' };

    if (quantity < item.product.minOrderQty) {
      return {
        success: false,
        message: `Minimum order quantity is ${item.product.minOrderQty} pcs.`,
      };
    }

    if (quantity > item.product.stockQty) {
      return {
        success: false,
        message: `Only ${item.product.stockQty} pcs currently available in stock.`,
      };
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId) {
          const { unitPrice, appliedTier } = computeEffectivePrice(
            i.product,
            quantity,
            isWholesaleAuthorized
          );
          return {
            ...i,
            quantity,
            unitPrice,
            appliedTier,
            lineTotal: unitPrice * quantity,
          };
        }
        return i;
      })
    );

    return { success: true };
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_MIN || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        freeShippingProgress,
        freeShippingThreshold: FREE_SHIPPING_MIN,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
