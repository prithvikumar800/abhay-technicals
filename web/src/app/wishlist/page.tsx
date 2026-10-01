'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { mockProducts } from '../../lib/mock-data';
import { ProductCard } from '../../components/product/ProductCard';

export default function WishlistPage() {
  const wishlistItems = mockProducts.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Saved Wishlist</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Quickly access parts saved for upcoming workshop repairs.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="py-12 text-center bg-surface-card rounded-2xl border border-border-subtle max-w-md mx-auto space-y-3">
          <Heart className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-content-primary">Your wishlist is currently empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg"
          >
            <span>Browse Spare Parts</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlistItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
