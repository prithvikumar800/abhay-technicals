'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingCart,
  Star,
  Info,
  ChevronRight,
  Loader2,
  Package,
  Mail,
} from 'lucide-react';
import { mockProducts } from '../../../lib/mock-data';
import { useCart } from '../../../providers/cart-provider';
import { useAuth } from '../../../providers/auth-provider';
import { WhatsAppCTA } from '../../../components/common/WhatsAppCTA';
import { ProductCard } from '../../../components/product/ProductCard';
import { SeoStructuredData } from '../../../components/seo/SeoStructuredData';
import { StorefrontProduct } from '../../../types';

function normalizeApiProduct(p: any): StorefrontProduct {
  const images: string[] = (p.images || []).map((img: any) =>
    typeof img === 'string' ? img : img.imageUrl
  );
  if (images.length === 0) {
    images.push('/images/cat-display.jpg');
  }

  return {
    id: p.id,
    sku: p.sku || `AT-WC-${p.id}`,
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    category: p.category || { id: p.categoryId, name: 'General', slug: 'general' },
    brand: p.brand || null,
    model: p.model || null,
    retailPrice: Number(p.retailPrice),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    stockQty: p.stockQty ?? 0,
    minOrderQty: p.minOrderQty || 1,
    weightGrams: p.weightGrams || 100,
    qualityGrade: p.qualityGrade || null,
    isActive: p.isActive ?? true,
    images,
    compatibleModels: (p.compatibleModels || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      brandName: p.brand?.name || '',
    })),
    wholesaleTiers: (p.wholesaleTiers || []).map((t: any) => ({
      id: t.id || String(t.minQuantity),
      minQuantity: t.minQuantity,
      tierPrice: Number(t.tierPrice),
    })),
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<StorefrontProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<StorefrontProduct[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { addItem } = useCart();
  const { isWholesaleAuthorized, user } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  // 1. Fetch live product by slug
  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiBaseUrl}/products/${slug}`);
        if (!res.ok) throw new Error('Product not found in API');

        const json = await res.json();
        if (json.success && json.data) {
          const norm = normalizeApiProduct(json.data);
          setProduct(norm);
          setSelectedImage(norm.images[0] || '/images/cat-display.jpg');
          setQuantity(norm.minOrderQty || 1);

          // Fetch related products from same category
          if (norm.category?.slug) {
            const relRes = await fetch(
              `${apiBaseUrl}/products?categorySlug=${norm.category.slug}&limit=4`
            );
            const relJson = await relRes.json();
            if (relJson.success && Array.isArray(relJson.data)) {
              const relNorm = relJson.data
                .filter((rp: any) => rp.slug !== slug)
                .slice(0, 4)
                .map(normalizeApiProduct);
              setRelatedProducts(relNorm);
            }
          }
        } else {
          throw new Error('Invalid product payload');
        }
      } catch {
        // Fallback to mock product
        const fallback = mockProducts.find((p) => p.slug === slug) || mockProducts[0];
        setProduct(fallback);
        setSelectedImage(fallback.images[0] || '/images/cat-display.jpg');
        setQuantity(fallback.minOrderQty || 1);
        setRelatedProducts(mockProducts.filter((p) => p.id !== fallback.id).slice(0, 4));
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) {
      fetchProduct();
    }
  }, [slug, apiBaseUrl]);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-xs font-semibold">Loading product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-12 text-center bg-surface-card rounded-2xl border border-border-subtle space-y-4 max-w-md mx-auto">
        <Package className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested spare part could not be found or has been discontinued.
        </p>
        <Link
          href="/shop"
          className="inline-block px-4 py-2 bg-[#0B1A3B] text-white text-xs font-bold rounded-lg"
        >
          Browse Spare Parts Catalogue
        </Link>
      </div>
    );
  }

  // Base single-piece unit price
  const baseUnitPrice = product.salePrice ?? product.retailPrice;

  // Raw wholesale tiers
  const rawTiers =
    product.wholesaleTiers && product.wholesaleTiers.length > 0
      ? [...product.wholesaleTiers].sort((a, b) => a.minQuantity - b.minQuantity)
      : [
          { minQuantity: 5, tierPrice: Math.round(baseUnitPrice * 0.95) },
          { minQuantity: 10, tierPrice: Math.round(baseUnitPrice * 0.9) },
        ];

  const firstTierMin = rawTiers[0]?.minQuantity || 5;

  interface DisplayTier {
    id: string;
    minQty: number;
    maxQty: number | null;
    label: string;
    unitPrice: number;
    hasDiscount: boolean;
  }

  const displayTiers: DisplayTier[] = [
    {
      id: 'base',
      minQty: product.minOrderQty || 1,
      maxQty: firstTierMin - 1,
      label:
        firstTierMin > 2
          ? `Buy ${product.minOrderQty || 1} - ${firstTierMin - 1} pieces`
          : `Buy 1 piece`,
      unitPrice: baseUnitPrice,
      hasDiscount: false,
    },
    ...rawTiers.map((t, idx) => {
      const nextTier = rawTiers[idx + 1];
      const maxQty = nextTier ? nextTier.minQuantity - 1 : null;
      const discountPct = Math.max(
        1,
        Math.round(((baseUnitPrice - t.tierPrice) / baseUnitPrice) * 100)
      );
      const label = maxQty
        ? `Buy ${t.minQuantity} - ${maxQty} pieces and save ${discountPct}%`
        : `Buy ${t.minQuantity}+ pieces and save ${discountPct}%`;
      return {
        id: `tier-${t.minQuantity}`,
        minQty: t.minQuantity,
        maxQty,
        label,
        unitPrice: t.tierPrice,
        hasDiscount: true,
      };
    }),
  ];

  // Active tier matching current quantity:
  const activeTier =
    [...displayTiers].reverse().find((t) => quantity >= t.minQty) || displayTiers[0];
  const effectiveUnitPrice = activeTier.unitPrice;

  const handleSelectTier = (tier: DisplayTier) => {
    if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
      // already in range
    } else {
      setQuantity(tier.minQty);
    }
  };

  const handleAddToCart = () => {
    const res = addItem(product, quantity);
    if (res.success) {
      setIsAdded(true);
      setAddedMessage(`Added ${quantity} pc${quantity > 1 ? 's' : ''} to your cart.`);
      setTimeout(() => setIsAdded(false), 2000);
    } else {
      setAddedMessage(res.message || 'Unable to add to cart.');
    }
  };

  return (
    <div className="space-y-10">
      <SeoStructuredData type="product" product={product} />

      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-content-muted flex-wrap">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-brand-primary">
          Spare Parts
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-brand-primary">
          {product.category.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-content-primary font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Product Media Gallery */}
        <div className="space-y-4">
          <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center justify-center aspect-square relative shadow-xs overflow-hidden">
            {/* Top-Left Quality Badge */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded text-xs sm:text-sm font-bold bg-[#0D0E11] text-white shadow-xs z-10">
              {product.qualityGrade || 'OEM Quality'}
            </span>

            {/* Main Product Image */}
            <div className="w-full h-full flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage || product.images[0] || '/images/cat-display.jpg'}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Thumbnail Strip for Multi-Image Products */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl border p-1 bg-white shrink-0 overflow-hidden transition-all ${
                    selectedImage === img
                      ? 'border-red-600 ring-2 ring-red-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buying & Specifications Information */}
        <div className="space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded text-xs sm:text-[13px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                SKU: {product.sku}
              </span>
              {product.brand && (
                <span className="px-2.5 py-1 rounded text-xs sm:text-[13px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  {product.brand.name}
                </span>
              )}
              <span className="px-2.5 py-1 rounded text-xs sm:text-[13px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {product.category.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-slate-600 pt-1">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-mono">4.8</span>
                <span className="text-slate-400 font-normal ml-1">(Bench Verified)</span>
              </div>
              <span>•</span>
              <span className={product.stockQty > 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                {product.stockQty > 0 ? `In Stock (${product.stockQty} pcs ready)` : 'Temporarily Out of Stock'}
              </span>
            </div>
          </div>

          {/* 1. Large Price Display (Matching Old Site / Image 1) */}
          <div className="space-y-0.5 pt-1">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E52521] font-mono">
              ₹{(effectiveUnitPrice * quantity).toFixed(2)}
            </div>
            {quantity > 1 && (
              <div className="text-sm text-slate-600 font-mono">
                ₹{effectiveUnitPrice.toFixed(2)} each · {activeTier.label}
              </div>
            )}
          </div>

          {/* 2. Quantity Input & Add to Cart Button (Image 1) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={product.minOrderQty || 1}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(product.minOrderQty || 1, val));
                }}
                className="w-18 h-11 text-center font-bold text-slate-900 bg-[#F5EAEA]/40 border border-[#E2D5D5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52521] text-base font-mono"
                aria-label="Quantity"
              />

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockQty === 0}
                className="px-7 py-3 bg-[#E52521] hover:bg-[#C61E1A] disabled:bg-slate-300 text-white font-bold text-sm sm:text-base rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to cart</span>
                  </>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>
            </div>

            {addedMessage && (
              <p className="text-sm font-bold text-emerald-700 animate-fadeIn">{addedMessage}</p>
            )}
          </div>

          {/* 3. Buy in whole sell (Selectable Radio Tiers exactly like Old Site / Image 1) */}
          <div className="space-y-2.5 pt-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Buy in whole sell
            </h3>

            <div className="space-y-2">
              {displayTiers.map((tier) => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => handleSelectTier(tier)}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded border cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'border-[#E52521] bg-red-50/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'border-[#E52521]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#E52521]" />}
                      </div>
                      <span
                        className={`text-sm sm:text-base ${
                          isSelected ? 'font-bold text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {tier.label}
                      </span>
                    </div>

                    <div className="text-sm sm:text-base font-mono text-right shrink-0">
                      {tier.hasDiscount ? (
                        <>
                          <span className="line-through text-slate-400 mr-2">
                            ₹{baseUnitPrice.toFixed(2)}
                          </span>
                          <span className="font-bold text-slate-900">
                            ₹{tier.unitPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-slate-900">
                          ₹{baseUnitPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Social Share Row (Matching Old Site / Image 1) */}
          <div className="flex items-center gap-6 pt-4 border-t border-slate-200 text-sm text-slate-600">
            <span className="font-bold text-slate-900">Share</span>
            <div className="flex items-center gap-4 text-slate-700">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/sharer/sharer.php"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.title} on Abhay Technicals`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${product.title} - Abhay Technicals`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
                title="Share on X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(product.title)}&body=${encodeURIComponent(`Check out ${product.title} on Abhay Technicals`)}`}
                className="hover:text-red-600 transition-colors"
                title="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 5. Compatible Handset Models */}
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-sm font-bold text-slate-900 block">
                Compatible Handset Models:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.compatibleModels.map((m) => (
                  <span
                    key={m.id}
                    className="px-2.5 py-1 rounded text-xs sm:text-[13px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 6. WhatsApp Direct Order CTA */}
          <div className="pt-2">
            <WhatsAppCTA
              presetText={`Hello Abhay Technicals, I want to order ${product.title} (SKU: ${product.sku}) at ₹${effectiveUnitPrice}. Is it available?`}
            />
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 text-slate-700">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Same-Day Courier Dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Bench Tested</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>7-Day Replacement</span>
            </div>
          </div>

          {/* Description Section with HTML support */}
          {product.description && (
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Component Specifications</h3>
              <div
                className="prose prose-sm text-sm text-slate-600 leading-relaxed max-w-none [&_ul]:list-disc [&_ul]:pl-4 [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Related Spare Parts Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Related {product.category.name} Components
            </h2>
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="text-xs sm:text-sm font-bold text-[#E52521] hover:text-[#C61E1A] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
