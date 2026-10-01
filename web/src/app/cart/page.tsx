'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  Smartphone,
} from 'lucide-react';
import { useCart } from '../../providers/cart-provider';
import { useAuth } from '../../providers/auth-provider';

function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    freeShippingProgress,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const { isWholesaleAuthorized } = useAuth();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-primary flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-content-primary">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-content-secondary leading-relaxed">
          Looks like you haven&apos;t added any replacement spare parts, batteries, or tools yet. Browse
          our catalog to find verified parts for your repairs.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs shadow-md transition-all min-h-[44px]"
        >
          <span>Explore Parts Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Shopping Cart ({itemCount} items)</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Review your order lines, verify minimum quantities, and inspect active wholesale tier discounts.
        </p>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-xl bg-surface-card border border-border-subtle shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-content-primary">
            <Truck className="w-4 h-4 text-brand-accent" />
            <span>
              {subtotal >= freeShippingThreshold ? (
                <strong className="text-emerald-700">Congratulations! You unlocked FREE Delhivery Shipping.</strong>
              ) : (
                <>Add ₹{(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Delhivery Shipping</>
              )}
            </span>
          </div>
          <span className="font-mono font-bold text-brand-accent">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-brand-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items (Left) vs Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden shadow-xs divide-y divide-border-subtle">
            {items.map((item) => (
              <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Product Thumbnail & Identification */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center shrink-0">
                    <Smartphone className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-bold text-xs sm:text-sm text-content-primary hover:text-brand-accent transition-colors truncate block"
                    >
                      {item.product.title}
                    </Link>
                    <div className="text-[11px] font-mono text-content-muted mt-0.5 flex items-center gap-2">
                      <span>SKU: {item.product.sku}</span>
                      <span>•</span>
                      <span>MOQ: {item.product.minOrderQty} pcs</span>
                    </div>
                    {item.appliedTier && (
                      <div className="mt-1">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item.appliedTier}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border-subtle">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-border-subtle rounded-lg bg-surface-subtle overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(item.product.minOrderQty, item.quantity - 1)
                        )
                      }
                      className="px-2.5 py-1 text-xs font-bold hover:bg-slate-200 min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-xs text-content-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-slate-200 min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[90px]">
                    <div className="font-mono font-bold text-sm text-content-primary">
                      ₹{item.lineTotal.toFixed(2)}
                    </div>
                    <div className="text-[10px] font-mono text-content-muted">
                      ₹{item.unitPrice.toFixed(2)} / pc
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 rounded-lg text-content-muted hover:text-status-error hover:bg-rose-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Remove item from cart"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Link
              href="/shop"
              className="text-brand-accent hover:underline font-semibold flex items-center gap-1"
            >
              <span>&larr; Continue Shopping</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-content-muted hover:text-status-error transition-colors"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="space-y-4">
          <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-content-primary border-b border-border-subtle pb-3">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-content-secondary">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold text-content-primary">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-content-secondary">
                <span>Delhivery Surface Freight</span>
                <span className="font-mono font-semibold text-content-primary">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `₹${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-content-secondary">
                <span>GST (18% inclusive)</span>
                <span className="font-mono text-content-muted">Included</span>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline text-sm font-extrabold text-content-primary">
                <span>Estimated Total</span>
                <span className="text-lg font-mono text-brand-primary">
                  ₹{(subtotal + shippingFee).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all min-h-[44px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle space-y-1 text-[11px] text-content-secondary">
              <div className="flex items-center gap-1.5 font-semibold text-content-primary">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Prepaid WhatsApp Checkout</span>
              </div>
              <p>
                Authoritative totals are verified against backend live inventory upon order creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
