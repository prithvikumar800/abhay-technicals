'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  SlidersHorizontal,
  Package,
  Layers,
  ShieldCheck,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { mockCategories, mockProducts, mockBrands } from '../../../lib/mock-data';
import { ProductCard } from '../../../components/product/ProductCard';
import { WhatsAppCTA } from '../../../components/common/WhatsAppCTA';
import { StorefrontProduct } from '../../../types';

// Category descriptions mapped by slug
const categoryDescriptions: Record<string, string> = {
  'back-panel':
    'OEM and original grade rear glass, acrylic, and polycarbonate battery back doors with pre-installed camera lens frames and adhesive.',
  battery:
    'Factory-tested zero-cycle replacement batteries with integrated IC protection for Apple, Samsung, Vivo, Realme, Xiaomi, and OnePlus devices. High-yield capacity tested for long-lasting performance.',
  'camera-glass':
    'Precision scratch-resistant rear camera glass lens replacements with pre-cut adhesive films for all popular smartphone models. Crystal-clear optical quality.',
  'charging-connectors':
    'OEM micro-USB and Type-C charging port connectors for board-level micro-soldering repairs and workshop stock.',
  'charging-flex':
    'Original sub-board PCB flex assemblies with USB charging ports, integrated microphones, antenna coaxial contacts, and fast-charging support.',
  'orignal-charging-flex':
    '100% Original OEM charging flex boards with original ICs, rapid charge support, and clear microphone output.',
  'display-conectors':
    'Fine-pitch FPC display connector sockets for motherboard and LCD flex cable micro-soldering repairs.',
  'fingerprint-censor':
    'Original replacement fingerprint biometric sensor flex cables with home button functionality.',
  'keypad-lcd':
    'Universal and brand-specific keypad phone LCD displays with multiple pin configurations (14-pin, 16-pin, 20-pin, 24-pin).',
  'main-flex':
    'Motherboard to sub-board interconnect FPC main flex cables for power, data, and audio transmission.',
  microphone:
    'High-sensitivity digital and analog SMD microphones for smartphone voice call and noise cancellation repairs.',
  'middle-panel':
    'Middle frame chassis housings, bezel skeletons, and interior mid-frames for structural repairs.',
  'oca-touch-glass':
    'High-clarity front outer touch glass with pre-laminated optical clear adhesive (OCA) for display refurbishment and broken outer glass separation.',
  'on-off-flex':
    'Power on/off switch and volume key FPC flex cable assemblies with tactile micro-switches.',
  'volume-flex':
    'Dedicated volume up/down control switch flex cables with original click response.',
  'side-rubber-key':
    'Replacement external side button key sets (Power and Volume rockers) with rubber seals.',
  'sim-holder':
    'Dual SIM tray holders and micro-SD card slot replacement trays in matching original device colors.',
  speaker:
    'Original acoustic ringer buzzers, loud speakers, and earpieces for crystal-clear smartphone audio repairs.',
  'speaker-jali':
    'Acoustic dust mesh grills and earpiece speaker protective jalis to block dust and moisture ingress.',
  tools:
    'Professional repair equipment, precision screwdrivers, suction openers, heat plates, and tweezers for mobile technicians.',
  'touch-pad':
    'Capacitive digitizer front touch panels for touch response restoration on compatible phones and tablets.',
  'smart-phone':
    'Brand new and certified refurbished smartphones with factory warranty and original packaging.',
  'other-products':
    'Specialty repair components, vibrator motors, thermal pads, screws, and workshop accessories.',
};

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Active category definition
  const currentCategory = useMemo(() => {
    return (
      mockCategories.find((c) => c.slug === slug) || {
        id: 999,
        name: slug
          ? slug
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
          : 'Spare Parts',
        slug: slug || 'general',
        productCount: 12,
      }
    );
  }, [slug]);

  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    let list = mockProducts.filter((p) => {
      // Direct category slug match or category id match
      const catSlug = p.category?.slug?.toLowerCase();
      const targetSlug = slug?.toLowerCase();
      if (catSlug && targetSlug) {
        if (catSlug === targetSlug) return true;
        // Handle common slug variants
        if (targetSlug === 'battery' && catSlug.includes('battery')) return true;
        if (targetSlug === 'displays' && (catSlug.includes('display') || catSlug.includes('lcd'))) return true;
        if (targetSlug === 'charging-flex' && catSlug.includes('flex')) return true;
      }
      return false;
    });

    // If mock data is sparse for this category, provide fallback products from the catalog
    if (list.length === 0) {
      list = mockProducts.slice(0, 4).map((p, idx) => ({
        ...p,
        id: `cat-${slug}-${idx}`,
        title: `${currentCategory.name} for ${p.brand?.name || 'Smartphone'} (Model Compatible)`,
        category: { id: currentCategory.id, name: currentCategory.name, slug: currentCategory.slug },
      }));
    }

    // Apply Brand filter if selected
    if (selectedBrand !== 'ALL') {
      list = list.filter((p) => p.brand?.slug?.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Apply In-Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.stockQty > 0);
    }

    // Apply Sorting
    if (sortBy === 'price-low') {
      list = [...list].sort(
        (a, b) => (a.salePrice ?? a.retailPrice) - (b.salePrice ?? b.retailPrice)
      );
    } else if (sortBy === 'price-high') {
      list = [...list].sort(
        (a, b) => (b.salePrice ?? b.retailPrice) - (a.salePrice ?? a.retailPrice)
      );
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [slug, currentCategory, selectedBrand, inStockOnly, sortBy]);

  // Available brands in this category for quick filtering
  const availableBrands = useMemo(() => {
    return mockBrands.slice(0, 7);
  }, []);

  const description =
    categoryDescriptions[slug] ||
    `Browse genuine ${currentCategory.name} spare parts for all major smartphone brands. Tested and verified for professional workshop repairs.`;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Breadcrumb Trail ── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
        <Link href="/" className="hover:text-[#E52521] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/categories" className="hover:text-[#E52521] transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{currentCategory.name}</span>
      </nav>

      {/* ── Category Header Banner ── */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-red-50 text-[#E52521] border border-red-100 text-[11px] font-bold uppercase tracking-wider">
              <Layers className="w-3 h-3" />
              <span>Category Catalogue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentCategory.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-200">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Part' : 'Parts'} Available
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Tested Quality</span>
            </span>
          </div>
        </div>

        {/* Wholesale Notification Strip */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E52521]" />
            <span>
              <strong>Wholesale Slabs Available:</strong> Automatic volume discounts apply when buying 5+ or 10+ pcs.
            </span>
          </div>
          <Link
            href="/wholesale"
            className="text-[11px] font-bold text-[#E52521] hover:underline"
          >
            Learn about Wholesale Rates →
          </Link>
        </div>
      </div>

      {/* ── Brand Filter Pills & Sort Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] text-xs">
        {/* Brand Selector Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-bold mr-1">Brand:</span>
          <button
            onClick={() => setSelectedBrand('ALL')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all min-h-[32px] ${
              selectedBrand === 'ALL'
                ? 'bg-[#0D0E11] text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
            }`}
          >
            All Brands
          </button>
          {availableBrands.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBrand(b.slug)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all min-h-[32px] ${
                selectedBrand === b.slug
                  ? 'bg-[#E52521] text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Sort & In-Stock Controls */}
        <div className="flex items-center gap-3 ml-auto">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-300 text-[#E52521] focus:ring-[#E52521] w-3.5 h-3.5"
            />
            <span className="text-[11px]">In Stock Only</span>
          </label>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#E52521]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categoryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-12 text-center space-y-4 max-w-md mx-auto">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">
            No parts found in this category
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            We are constantly adding new inventory. Contact our sourcing desk on WhatsApp with your handset model or PCB photo.
          </p>
          <div className="pt-2">
            <WhatsAppCTA presetText={`Hello Abhay Technicals, I am looking for parts in ${currentCategory.name}. Are they in stock?`} />
          </div>
        </div>
      )}

      {/* ── WhatsApp Sourcing Help Footer ── */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              Need an unlisted {currentCategory.name} model?
            </div>
            <div className="text-[11px] text-slate-500">
              Send your handset model number or part photo to our WhatsApp desk for immediate quotation.
            </div>
          </div>
        </div>

        <WhatsAppCTA
          presetText={`Hello Abhay Technicals, I need help finding an unlisted part in ${currentCategory.name}.`}
        />
      </div>
    </div>
  );
}
