'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, Heart, Minus, Plus, Star } from 'lucide-react';
import { StorefrontProduct } from '../../types';
import { useCart } from '../../providers/cart-provider';

export function ProductCard({
  product,
  badgeText,
  discountText,
  fitsText,
  imageUrl,
}: {
  product: StorefrontProduct;
  badgeText?: string;
  discountText?: string;
  fitsText?: string;
  imageUrl?: string;
}) {
  const { addItem } = useCart();
  const minQty = product.minOrderQty || 1;
  const [quantity, setQuantity] = useState(minQty);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const res = addItem(product, quantity);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleQuantityMinus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > minQty) setQuantity(quantity - 1);
  };

  const handleQuantityPlus = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const brandName = product.brand?.name || product.compatibleModels?.[0]?.brandName || product.category?.name || 'Abhay';
  
  let calcDiscount = discountText;
  if (!calcDiscount && product.salePrice && product.retailPrice && product.retailPrice > product.salePrice) {
    const percent = Math.round(((product.retailPrice - product.salePrice) / product.retailPrice) * 100);
    calcDiscount = `${percent}% OFF`;
  }

  const rawImg = product.images?.[0];
  const firstImg = typeof rawImg === 'string' ? rawImg : (rawImg as any)?.imageUrl;
  const effectiveImage = imageUrl || firstImg || '/images/cat-display.jpg';

  const effectivePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.retailPrice;
  const originalPrice = product.salePrice && product.retailPrice > product.salePrice ? product.retailPrice : null;

  return (
    <div className="bg-white rounded-md border border-[#E2E8F0] hover-lift hover:border-slate-300 flex flex-col h-full overflow-hidden group">
      {/* ── 1. IMAGE AREA ─────────────────────────────────────────────────── */}
      <div className="relative bg-white aspect-square p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b border-[#E2E8F0]">
        {/* Top-Left: Badge or Discount */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {calcDiscount ? (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#E52521] text-white uppercase tracking-wider shadow-2xs">
              {calcDiscount}
            </span>
          ) : badgeText ? (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0D0E11] text-white shadow-2xs">
              {badgeText}
            </span>
          ) : null}
        </div>

        {/* Top-Right: Wishlist Icon */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 active:scale-90 shadow-2xs ${
            isWishlisted
              ? 'border-red-200 bg-red-50 text-[#E52521]'
              : 'border-slate-200 bg-white/95 text-slate-400 hover:text-[#E52521] hover:border-red-200'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-transform ${isWishlisted ? 'fill-[#E52521] scale-110' : ''}`} />
        </button>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={effectiveImage}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>
      </div>

      {/* ── 2. PRODUCT DETAILS ───────────────────────────────────────────── */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Fitment Tag */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-black text-[#E52521] uppercase tracking-widest mb-1.5">
            <span className="truncate">{brandName}</span>
            {fitsText && (
              <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px] lowercase tracking-normal" title={fitsText}>
                {fitsText}
              </span>
            )}
          </div>

          {/* Product Title (2-line clamp) with larger readable size and crisp contrast */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-sm sm:text-base font-bold text-[#0D0E11] hover:text-[#E52521] transition-colors line-clamp-2 leading-snug tracking-tight"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Rating */}
          {(product.rating || product.reviewCount) && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-500 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-bold text-slate-900">{product.rating || 4.8}</span>
              {product.reviewCount && (
                <span className="text-slate-400 text-xs">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* ── 3. PRICE & WHOLESALE BADGE ─────────────────────────────────── */}
        <div className="space-y-2.5 pt-2.5 border-t border-[#E2E8F0]">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-lg sm:text-xl font-black text-[#0D0E11] font-mono tracking-tight tabular-nums">
                ₹{effectivePrice.toFixed(0)}
              </span>
              {originalPrice && (
                <span className="text-[13px] text-slate-400 line-through font-mono tabular-nums">
                  ₹{originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 tracking-wide uppercase shrink-0">
              ✓ In Stock
            </span>
          </div>

          {/* Wholesale Availability Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 text-[#E52521] text-[11px] font-bold tracking-wide uppercase border border-red-200/60">
            <span>Wholesale Available</span>
          </div>

          {/* ── 4. QUANTITY SELECTOR & ADD TO CART (REQUIRED) ──────────── */}
          <div className="flex items-center gap-2 pt-1">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#CBD5E1] rounded bg-[#F8FAFC] text-slate-900 text-sm overflow-hidden shrink-0">
              <button
                type="button"
                onClick={handleQuantityMinus}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-200 active:bg-slate-300 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 sm:w-8 text-center font-bold text-sm font-mono tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleQuantityPlus}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-200 active:bg-slate-300 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button (Official Logo Crimson Red #E52521) */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 h-8 sm:h-9 px-3 rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E52521] hover:bg-[#C61E1A] text-white active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="truncate">Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="truncate">Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
