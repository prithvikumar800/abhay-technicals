import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  CheckCircle2,
  Phone,
  MessageCircle,
  Smartphone,
  Tag,
  Clock,
  ExternalLink,
  Wrench,
  Percent,
  Check,
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { ModelExplorer } from '../components/home/ModelExplorer';
import { NewsletterForm } from '../components/home/NewsletterForm';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { StorefrontProduct } from '../types';
import { mockProducts, mockCategories } from '../lib/mock-data';

// ── 12 Featured Categories from Old Site ──────────────────────────────────────
const categoryItems = [
  { name: 'Back Panel', count: '425+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2026/05/A22-5G-ring.png', slug: 'back-panel' },
  { name: 'Mobile Batteries', count: '43+ Models', image: 'https://abhaytechnicals.com/wp-content/uploads/2026/01/BN-63.jpg', slug: 'battery' },
  { name: 'Camera Glass', count: '346+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/12/Y53-new.png', slug: 'camera-glass' },
  { name: 'Charging Flex', count: '460+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2024/02/i3.jpg', slug: 'charging-flex' },
  { name: 'Original Charging Flex', count: '406+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2023/08/itel-p55-1.png', slug: 'orignal-charging-flex' },
  { name: 'Main Flex', count: '252+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/12/C67-5G.png', slug: 'main-flex' },
  { name: 'On / Off Flex', count: '401+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/06/G35.png', slug: 'on-off-flex' },
  { name: 'Middle Panel', count: '138+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/05/realme-11-pro.jpg', slug: 'middle-panel' },
  { name: 'Side Rubber Key', count: '138+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-8-pro.png', slug: 'side-rubber-key' },
  { name: 'Fingerprint Sensor', count: '108+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/12/A5-2020.png', slug: 'fingerprint-censor' },
  { name: 'Speakers', count: '120+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/07/realme-11x-5g.png', slug: 'speaker' },
  { name: 'Charging Connectors', count: '43+ Parts', image: 'https://abhaytechnicals.com/wp-content/uploads/2025/08/L7-Ver.-2-.png', slug: 'charging-connectors' },
];

// ── Popular Smartphone Brands (Using real SVG logos in /public/brands) ────────
const brandItems = [
  { name: 'Samsung', slug: 'samsung', logo: '/brands/samsung.svg' },
  { name: 'Apple', slug: 'apple', logo: '/brands/apple.svg' },
  { name: 'Xiaomi', slug: 'xiaomi', logo: '/brands/xiaomi.svg' },
  { name: 'Vivo', slug: 'vivo', logo: '/brands/vivo.svg' },
  { name: 'Oppo', slug: 'oppo', logo: '/brands/oppo.svg' },
  { name: 'Realme', slug: 'realme', logo: '/brands/realme.svg' },
  { name: 'OnePlus', slug: 'oneplus', logo: '/brands/oneplus.svg' },
  { name: 'Motorola', slug: 'motorola', logo: '/brands/motorola.svg' },
  { name: 'Infinix', slug: 'infinix', logo: '/brands/infinix.svg' },
  { name: 'POCO', slug: 'poco', logo: '/brands/poco.svg' },
];

// ── Featured Spare Parts (from Real Old Site Catalogue) ───────────────────────
const featuredProducts: Array<{
  product: StorefrontProduct;
  badge: string;
  discount: string;
  fits: string;
  image: string;
}> = [
  {
    badge: 'OEM Quality',
    discount: '10% OFF',
    fits: 'Samsung Galaxy A22',
    image: mockProducts.find(p => p.category.slug === 'back-panel')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2026/05/A22-5G-ring.png',
    product: mockProducts.find(p => p.category.slug === 'back-panel') || mockProducts[0],
  },
  {
    badge: 'Best Seller',
    discount: '15% OFF',
    fits: 'Tecno / Infinix',
    image: mockProducts.find(p => p.category.slug === 'charging-flex')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2024/02/i3.jpg',
    product: mockProducts.find(p => p.category.slug === 'charging-flex') || mockProducts[1],
  },
  {
    badge: '100% Tested',
    discount: '12% OFF',
    fits: 'Redmi 10 / Mi 10 Prime',
    image: mockProducts.find(p => p.category.slug === 'battery')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2026/01/BN-63.jpg',
    product: mockProducts.find(p => p.category.slug === 'battery') || mockProducts[2],
  },
  {
    badge: 'OEM Grade',
    discount: '8% OFF',
    fits: 'Vivo Y53 2020',
    image: mockProducts.find(p => p.category.slug === 'camera-glass')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2025/12/Y53-new.png',
    product: mockProducts.find(p => p.category.slug === 'camera-glass') || mockProducts[3],
  },
];

// ── New Arrivals (from Real Old Site Catalogue) ──────────────────────────────
const newArrivals: Array<{
  product: StorefrontProduct;
  badge: string;
  fits: string;
  image: string;
}> = [
  {
    badge: 'New',
    fits: 'Realme C67 5G',
    image: mockProducts.find(p => p.category.slug === 'main-flex')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2025/12/C67-5G.png',
    product: mockProducts.find(p => p.category.slug === 'main-flex') || mockProducts[4],
  },
  {
    badge: 'New',
    fits: 'Moto G35 Series',
    image: mockProducts.find(p => p.category.slug === 'side-rubber-key')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2025/06/G35.png',
    product: mockProducts.find(p => p.category.slug === 'side-rubber-key') || mockProducts[5],
  },
  {
    badge: 'New',
    fits: 'Oppo Reno 8 Pro',
    image: mockProducts.find(p => p.slug === 'oppo-reno-8-pro-side-key-button-set')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-8-pro.png',
    product: mockProducts.find(p => p.slug === 'oppo-reno-8-pro-side-key-button-set') || mockProducts[6],
  },
  {
    badge: 'New',
    fits: 'Realme 11X 5G',
    image: mockProducts.find(p => p.category.slug === 'speaker')?.images[0] || 'https://abhaytechnicals.com/wp-content/uploads/2025/07/realme-11x-5g.png',
    product: mockProducts.find(p => p.category.slug === 'speaker') || mockProducts[7],
  },
];

// ── Repair Guides (3 Content Cards per Section 13) ───────────────────────────
const repairGuides = [
  {
    category: 'Display Repair',
    title: 'How to Replace a Cracked Display on Vivo Y11 & Y12',
    excerpt: 'Step-by-step frame disassembly, thermal separation of touch glass, and clean adhesive cleanup.',
    image: '/images/cat-display.jpg',
    slug: 'replace-cracked-display-vivo-y11',
    readTime: '5 min read',
  },
  {
    category: 'Battery Diagnostics',
    title: 'Smartphone Battery Health & Cycle Diagnostics Guide',
    excerpt: 'Identifying swollen lithium cells, multimeter current draw tests, and zero-cycle verification.',
    image: '/images/cat-battery.jpg',
    slug: 'battery-health-tips-longer-performance',
    readTime: '4 min read',
  },
  {
    category: 'OCA Lamination',
    title: 'OCA Lamination Pressure & Bubble Removal Best Practices',
    excerpt: 'Optimizing defoamer chamber pressure and UV curing timing for bubble-free screen refurbishment.',
    image: '/images/cat-oca-glass.jpg',
    slug: 'oca-lamination-pressure-bubble-removal-guide',
    readTime: '6 min read',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-14">

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: SPLIT COMMERCE HERO (Logo Red #E52521 & Jet Black #0D0E11)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white rounded-lg border border-[#E2E8F0] shadow-xs overflow-hidden relative">
        {/* Subtle top brand accent line in Logo Crimson Red */}
        <div className="h-1 w-full bg-gradient-to-r from-[#E52521] via-[#E52521] to-[#0D0E11]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-8 lg:p-10">
          {/* Left Column (7 cols / 58%): Core Value Proposition & Conversion */}
          <div className="lg:col-span-7 space-y-5 animate-fade-in-up">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-[#E52521] text-xs sm:text-[13px] font-bold tracking-wide animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52521] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52521]"></span>
              </span>
              <span>DIRECT SOURCING FOR REPAIR TECHNICIANS &amp; WORKSHOPS</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0D0E11] tracking-tight leading-[1.12]">
                Precision Mobile Parts. <br />
                <span className="text-[#E52521]">Tested Before Dispatch.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 max-w-xl leading-relaxed">
                Source OEM-grade batteries, calibrated display combos, charging sub-boards, and micro-soldering tools.
                Wholesale slabs starting from 5+ pcs with guaranteed model compatibility across India.
              </p>
            </div>

            {/* Quick Brand Selector Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quick Brand Selection:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Samsung', slug: 'samsung' },
                  { name: 'Apple / iPhone', slug: 'apple' },
                  { name: 'Vivo', slug: 'vivo' },
                  { name: 'Oppo', slug: 'oppo' },
                  { name: 'Realme', slug: 'realme' },
                  { name: 'OnePlus', slug: 'oneplus' },
                  { name: 'Xiaomi', slug: 'xiaomi' },
                ].map((b, i) => (
                  <Link
                    key={i}
                    href={`/shop?brand=${b.slug}`}
                    className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded bg-[#F8FAFC] border border-[#CBD5E1] text-slate-700 hover:text-[#E52521] hover:border-[#E52521] hover:bg-white transition-all shadow-2xs hover-lift active-press"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm rounded-md flex items-center gap-2 transition-all shadow-sm group min-h-[44px] hover-lift active-press"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/model-explorer"
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border border-[#CBD5E1] font-bold text-xs sm:text-sm rounded-md flex items-center gap-2 transition-all min-h-[44px] shadow-2xs hover-lift active-press"
              >
                <Smartphone className="w-4 h-4 text-[#E52521]" />
                <span>Find by Phone Model</span>
              </Link>
              <Link
                href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20need%20spare%20parts%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm rounded-md flex items-center gap-2 transition-all min-h-[44px] shadow-2xs hover-lift active-press"
                title="Direct WhatsApp Order Desk"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Order</span>
              </Link>
            </div>

            {/* 4 Trust Points Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">100% Tested</div>
                  <div className="text-[11px] sm:text-xs text-slate-500">Zero-cycle &amp; OEM</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Delhivery Air</div>
                  <div className="text-[11px] sm:text-xs text-slate-500">Pan-India express</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Wholesale Slabs</div>
                  <div className="text-[11px] sm:text-xs text-slate-500">Tier rates on 5+ pcs</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">7-Day Warranty</div>
                  <div className="text-[11px] sm:text-xs text-slate-500">Testing dry-test policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols / 42%): Rich Visual Showcase */}
          <div className="lg:col-span-5 space-y-3 animate-scale-in delay-150">
            {/* Primary Showcase Card with Floating Chips */}
            <div className="relative rounded-lg overflow-hidden border border-[#CBD5E1] bg-slate-900 shadow-md group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-parts-comp.jpg"
                  alt="Precision smartphone spare parts and repair components"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                {/* Subtle gradient vignette for professional depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Quality Tested with gentle floating micro-animation */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-[#CBD5E1] rounded px-3 py-1.5 shadow-sm text-left animate-float">
                  <div className="text-[10px] font-black text-[#E52521] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E52521]" />
                    <span>OEM Tested Parts</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">100% Quality Checked</div>
                </div>

                {/* Top Right Live Stock Chip with breathing glow */}
                <div className="absolute top-3 right-3 bg-[#0D0E11]/90 backdrop-blur-xs text-white border border-slate-700/80 rounded px-2.5 py-1 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-sm animate-pulse-glow">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>10,000+ IN STOCK</span>
                </div>

                {/* Bottom Overlay: Real technician trust indicator */}
                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-xs rounded-md p-3 border border-white/80 shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-[#E52521] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      AT
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Trusted by 2,500+ Indian Workshops
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        Batteries · Displays · Sub-Boards · Flex Cables
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/model-explorer"
                    className="shrink-0 px-3 py-1.5 bg-[#0D0E11] hover:bg-slate-800 active:scale-95 text-white text-[11px] font-bold rounded transition-all"
                  >
                    Match SKU
                  </Link>
                </div>
              </div>
            </div>

            {/* 2 Bottom Quick Mini-Tiles */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/categories/battery"
                className="p-3 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-red-300 rounded-md transition-all shadow-2xs group flex items-center gap-2.5 hover-lift active-press"
              >
                <div className="w-8 h-8 rounded bg-red-50 text-[#E52521] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#E52521] group-hover:text-white transition-colors">
                  ⚡
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-[#E52521] transition-colors">
                    Zero-Cycle Batteries
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">High-yield capacity IC</div>
                </div>
              </Link>

              <Link
                href="/categories/charging-flex"
                className="p-3 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-red-300 rounded-md transition-all shadow-2xs group flex items-center gap-2.5 hover-lift active-press"
              >
                <div className="w-8 h-8 rounded bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#0D0E11] group-hover:text-white transition-colors">
                  🔌
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-[#E52521] transition-colors">
                    Sub-Boards &amp; Flex
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">Tested charging circuits</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: QUICK CATEGORY SECTION (Compact Grid)
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Shop by Category
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Find the right spare part for your repair.
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-[#E52521] hover:text-[#C61E1A] flex items-center gap-1 transition-colors hover:translate-x-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
            {categoryItems.map((cat, idx) => (
              <Link
                key={idx}
                href={`/categories/${cat.slug}`}
                className="bg-white rounded-md border border-[#E2E8F0] hover:border-slate-300 hover-lift p-3.5 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square flex items-center justify-center p-1 overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-[#E52521] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{cat.count}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: MODEL COMPATIBILITY FINDER
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section>
          <ModelExplorer />
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: SHOP BY BRAND
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Shop by Brand
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Select your phone brand to explore compatible spare parts.
              </p>
            </div>
            <Link
              href="/brands"
              className="text-xs sm:text-sm font-bold text-[#E52521] hover:text-[#C61E1A] flex items-center gap-1 transition-colors hover:translate-x-0.5"
            >
              <span>All Brands</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
            {brandItems.map((brand, idx) => (
              <Link
                key={idx}
                href={`/shop?brand=${brand.slug}`}
                className="bg-white rounded-md border border-[#E2E8F0] hover:border-slate-300 hover-lift py-3.5 px-3 flex flex-col items-center justify-center text-center transition-all group min-h-[82px]"
                title={`Shop ${brand.name} spare parts`}
              >
                <div className="h-7 w-full flex items-center justify-center px-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-6 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-2 group-hover:text-[#E52521] transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: WHOLESALE SECTION (B2B Buy More. Save More.)
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="scale-in">
        <section className="bg-white rounded-md border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs hover-lift">
          <div className="max-w-3xl space-y-2 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-50 text-[#E52521] text-xs font-bold border border-red-100 uppercase tracking-wider">
              <span>B2B Volume Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Buy More. Save More.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Sign in with your mobile number to unlock wholesale pricing. A 6-digit verification code will be sent to your WhatsApp.
            </p>
          </div>

          {/* 3 Pricing Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {/* Benefit 1: Retail */}
            <div className="rounded-md border border-[#E2E8F0] p-5 bg-[#F8FAFC] space-y-2 hover-lift">
              <div className="w-8 h-8 rounded bg-white border border-[#CBD5E1] text-[#0D0E11] flex items-center justify-center font-bold text-xs sm:text-sm font-mono shadow-2xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Retail Orders</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Single-piece orders with fast dispatch for urgent walk-in customer repairs. No minimum quantity required.
              </p>
            </div>

            {/* Benefit 2: Wholesale */}
            <div className="rounded-md border border-red-200 p-5 bg-red-50/40 space-y-2 hover-lift">
              <div className="w-8 h-8 rounded bg-[#E52521] text-white flex items-center justify-center font-bold text-xs sm:text-sm font-mono shadow-2xs">
                02
              </div>
              <h3 className="text-base font-bold text-[#E52521]">Wholesale Pricing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tier-based slabs starting at 5–10 pcs. Save up to 35% on fast-moving batteries, flexes, and connectors.
              </p>
            </div>

            {/* Benefit 3: Bulk Orders */}
            <div className="rounded-md border border-[#E2E8F0] p-5 bg-[#F8FAFC] space-y-2 hover-lift">
              <div className="w-8 h-8 rounded bg-white border border-[#CBD5E1] text-[#0D0E11] flex items-center justify-center font-bold text-xs sm:text-sm font-mono shadow-2xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Bulk Volume Slabs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated inventory allocation, direct WhatsApp order verification, and priority air cargo shipping.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/login"
              className="px-6 py-2.5 sm:py-3 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm rounded-md transition-all shadow-xs min-h-[44px] flex items-center hover-lift active-press"
            >
              Sign In with Mobile OTP
            </Link>
            <Link
              href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20am%20a%20repair%20shop%20owner%20interested%20in%20wholesale%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 sm:py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm rounded-md flex items-center gap-2 transition-all shadow-xs min-h-[44px] hover-lift active-press"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z"/>
              </svg>
              <span>Talk on WhatsApp</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: NEW ARRIVALS (4 per row desktop)
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                New Arrivals
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Fresh stock of mobile spare parts, tools and accessories.
              </p>
            </div>
            <Link
              href="/shop?sort=newest"
              className="text-xs sm:text-sm font-bold text-[#E52521] hover:text-[#C61E1A] flex items-center gap-1 transition-colors hover:translate-x-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop: 4, Tablet: 3, Mobile: 2 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {newArrivals.map((item, idx) => (
              <ProductCard
                key={idx}
                product={item.product}
                badgeText={item.badge}
                fitsText={item.fits}
                imageUrl={item.image}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 11: TRUST SECTION (Compact Horizontal Bar)
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="bg-white rounded-md border border-[#E2E8F0] p-4 sm:p-6 shadow-xs hover-lift">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Item 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Quality Products</h4>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">Tested Before Dispatch</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Wholesale Pricing</h4>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">For Verified Technicians</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Secure Payments</h4>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">UPI, Cards, Net Banking</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E52521] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Pan India Delivery</h4>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">Air Express via Delhivery</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 12: TECHNICIAN-FOCUSED BANNER
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="bg-white rounded-md border border-[#E2E8F0] shadow-xs overflow-hidden hover-lift">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-50 text-[#E52521] text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Workshop Supplies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Everything You Need for Your Next Repair
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                From connectors and flex cables to displays, batteries and repair tools.
                Equip your service center with durable components certified for direct workshop installation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/shop"
                  className="px-5 py-2.5 sm:py-3 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm rounded-md transition-all shadow-xs min-h-[44px] flex items-center hover-lift active-press"
                >
                  Shop Spare Parts
                </Link>
                <Link
                  href="/shop?category=tools"
                  className="px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-50 text-slate-800 border border-[#CBD5E1] font-bold text-xs sm:text-sm rounded-md transition-all min-h-[44px] flex items-center hover-lift active-press"
                >
                  Shop Tools
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-md overflow-hidden border border-[#E2E8F0] aspect-16/10 bg-slate-50 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/technician-story.jpg"
                  alt="Smartphone technician repair bench"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 13: REPAIR GUIDES / CONTENT (3 Content Cards)
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Repair Tips &amp; Guides
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Practical guides written by experienced technicians.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-bold text-[#E52521] hover:text-[#C61E1A] flex items-center gap-1 transition-colors hover:translate-x-0.5"
            >
              <span>View All Guides</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {repairGuides.map((guide, idx) => (
              <Link
                key={idx}
                href={`/blog/${guide.slug}`}
                className="bg-white rounded-md border border-[#E2E8F0] hover:border-slate-300 hover-lift overflow-hidden flex flex-col transition-all group"
              >
                <div className="relative aspect-16/9 bg-slate-50 overflow-hidden border-b border-[#E2E8F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-bold bg-[#0D0E11] text-white shadow-2xs">
                    {guide.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#E52521] transition-colors line-clamp-2 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                    <span className="text-slate-500">{guide.readTime}</span>
                    <span className="font-bold text-[#E52521] group-hover:underline flex items-center gap-1">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 14: WHATSAPP CTA
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="scale-in">
        <section className="bg-white rounded-md border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs hover-lift">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto animate-pulse-glow">
              <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Need Help Finding a Part?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Send us the phone model or part requirement and our team can help. Fast response during business hours.
            </p>
            <div className="pt-2">
              <Link
                href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20need%20help%20finding%20a%20specific%20spare%20part."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm transition-all shadow-xs min-h-[44px] hover-lift active-press"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 15: NEWSLETTER / STOCK ALERTS
      ════════════════════════════════════════════════════════════════════ */}
      <ScrollReveal animation="fade-up">
        <section className="bg-white rounded-md border border-[#E2E8F0] p-6 sm:p-8 shadow-xs hover-lift">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Subscribe for Stock Alerts &amp; Pricing Updates
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Receive notifications when fresh batches of batteries, displays, and flex boards arrive.
              </p>
            </div>

            <div className="lg:col-span-5">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}
