'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Phone,
  Truck,
  HelpCircle,
  Briefcase,
  ChevronDown,
  Layers,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useCart } from '../../providers/cart-provider';
import { useAuth } from '../../providers/auth-provider';
import { mockCategories, mockProducts, mockBrands } from '../../lib/mock-data';

export function Header() {
  const router = useRouter();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>(mockCategories);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
    fetch(`${apiBaseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategories(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideDesktop = desktopSearchRef.current?.contains(target);
      const isInsideMobile = mobileSearchRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Search filtering logic - triggers strictly when 3 or more letters typed
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const showSuggestions = isSearchFocused && trimmedQuery.length >= 3;

  const matchingCategories = useMemo(() => {
    if (trimmedQuery.length < 3) return [];
    return categories
      .filter(
        (c) =>
          c.name.toLowerCase().includes(trimmedQuery) ||
          c.slug.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, 4);
  }, [categories, trimmedQuery]);

  const matchingBrands = useMemo(() => {
    if (trimmedQuery.length < 3) return [];
    return mockBrands
      .filter(
        (b) =>
          b.name.toLowerCase().includes(trimmedQuery) ||
          b.slug.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, 4);
  }, [trimmedQuery]);

  const matchingProducts = useMemo(() => {
    if (trimmedQuery.length < 3) return [];
    return mockProducts.filter((p) => {
      if (p.title.toLowerCase().includes(trimmedQuery)) return true;
      if (p.sku.toLowerCase().includes(trimmedQuery)) return true;
      if (p.category?.name.toLowerCase().includes(trimmedQuery)) return true;
      if (p.brand?.name.toLowerCase().includes(trimmedQuery)) return true;
      if (p.model?.name.toLowerCase().includes(trimmedQuery)) return true;
      if (p.compatibleModels?.some((m) => m.name.toLowerCase().includes(trimmedQuery))) return true;
      return false;
    });
  }, [trimmedQuery]);

  const topProductSuggestions = useMemo(() => {
    return matchingProducts.slice(0, 6);
  }, [matchingProducts]);

  const renderSuggestionsDropdown = () => {
    if (!showSuggestions) return null;

    const hasAnyMatches =
      matchingCategories.length > 0 ||
      matchingBrands.length > 0 ||
      matchingProducts.length > 0;

    return (
      <div
        className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#CBD5E1] rounded-lg shadow-2xl z-50 overflow-hidden text-left divide-y divide-slate-100 max-h-[75vh] overflow-y-auto animate-fade-in-down"
        onMouseDown={(e) => {
          // Prevent blur before click event fires
          e.preventDefault();
        }}
      >
        {/* Suggested Categories & Brands */}
        {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
          <div className="p-3 bg-slate-50/90 space-y-2.5">
            {matchingCategories.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Suggested Categories
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchingCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:text-[#E52521] hover:border-[#E52521] hover:bg-red-50/30 transition-all shadow-2xs"
                    >
                      <Layers className="w-3 h-3 text-[#E52521]" />
                      <span>{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchingBrands.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Suggested Brands
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchingBrands.map((b) => (
                    <Link
                      key={b.id}
                      href={`/shop?brand=${b.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:text-[#E52521] hover:border-[#E52521] transition-all shadow-2xs"
                    >
                      <span>{b.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Matching Products */}
        {topProductSuggestions.length > 0 && (
          <div>
            <div className="px-3.5 py-2 bg-slate-100/70 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>MATCHING SPARE PARTS ({matchingProducts.length})</span>
              <span className="text-[11px] text-slate-500 font-normal">Click to view product</span>
            </div>
            <div className="divide-y divide-slate-100">
              {topProductSuggestions.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  onClick={() => setIsSearchFocused(false)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={prod.images[0] || '/images/cat-display.jpg'}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E52521] truncate transition-colors">
                      {prod.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] text-slate-700 font-semibold truncate">
                        {prod.category?.name}
                      </span>
                      {prod.brand && (
                        <span className="truncate">
                          {prod.brand.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-[#E52521] font-mono tabular-nums">
                      ₹{(prod.salePrice || prod.retailPrice).toFixed(2)}
                    </div>
                    {prod.wholesaleTiers && prod.wholesaleTiers.length > 0 && (
                      <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5 inline-block font-mono tabular-nums">
                        ₹{prod.wholesaleTiers[0].tierPrice.toFixed(0)} (5+ pcs)
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom View All Link */}
            <Link
              href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
              onClick={() => setIsSearchFocused(false)}
              className="flex items-center justify-between p-3.5 bg-red-50/60 hover:bg-red-50 text-[#E52521] font-bold text-xs sm:text-sm transition-colors"
            >
              <span>View all {matchingProducts.length} results for &ldquo;{searchQuery}&rdquo;</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Empty state when no matches found */}
        {!hasAnyMatches && (
          <div className="p-6 text-center">
            <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">
              No spare parts found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
              Try searching by handset model (e.g. Vivo Y21, Samsung A20, Redmi 10) or component (e.g. Battery, Charging Flex, Camera Glass).
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* ── 1. TOP UTILITY BAR (Logo Jet Black #0D0E11) ────────────────────── */}
      <div className="bg-[#0D0E11] text-slate-200 text-xs py-2 px-4 sm:px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Supplier statement */}
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#E52521] shrink-0" />
            <span className="font-semibold text-slate-100 tracking-wide truncate text-xs sm:text-[13px]">
              India&apos;s Trusted Mobile Spare Parts Supplier
            </span>
            <span className="hidden md:inline text-zinc-500">|</span>
            <span className="hidden md:inline text-zinc-300 text-xs">Direct Workshop &amp; Retail Rates</span>
          </div>

          {/* Right: Quick utility links */}
          <div className="flex items-center gap-3 sm:gap-5 text-slate-200 shrink-0 font-medium text-xs">
            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-white hover:text-slate-200 transition-colors font-bold text-xs"
              >
                <User className="w-3.5 h-3.5 text-[#E52521]" />
                <span className="max-w-[130px] truncate">{user.name || 'My Account'}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/login"
                  className="hover:text-white transition-colors font-semibold"
                >
                  Sign In
                </Link>
                <span className="text-zinc-500">/</span>
                <Link
                  href="/register"
                  className="text-white hover:text-[#E52521] transition-colors font-bold"
                >
                  Register
                </Link>
              </div>
            )}
            <span className="hidden sm:inline text-zinc-700">|</span>
            <Link
              href="/track-order"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors text-xs"
            >
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Track Order</span>
            </Link>
            <Link
              href="/wholesale"
              className="flex items-center gap-1.5 hover:text-white transition-colors text-amber-300 font-bold text-xs"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Wholesale</span>
            </Link>
            <Link
              href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20have%20an%20enquiry%20regarding%20mobile%20spare%20parts."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:text-[#25D366] transition-colors font-semibold text-xs"
            >
              <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z"/>
              </svg>
              <span>WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN HEADER (Logo, Dominant Search, Account/Wishlist/Cart) ── */}
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-white shadow-xs border border-[#E2E8F0] group-hover:border-[#E52521] transition-all flex items-center justify-center p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Abhay Technicals Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black tracking-tight text-[#0D0E11] leading-none">
                ABHAY <span className="text-[#E52521]">TECHNICALS</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-wider block mt-1 uppercase">
                Mobile Spare Parts &amp; Tools
              </span>
            </div>
          </Link>

          {/* Large Dominant Search Bar (Center) with Live Autocomplete Suggestions */}
          <div ref={desktopSearchRef} className="hidden md:flex flex-1 max-w-2xl relative mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSearchFocused(false);
                  }}
                  placeholder="Search spare parts, model or product..."
                  className="w-full pl-4 pr-24 py-2.5 text-sm text-slate-900 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white transition-all font-sans placeholder:text-slate-400 placeholder:text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="absolute right-22 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#E52521] hover:bg-[#C61E1A] text-white rounded text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>
            {renderSuggestionsDropdown()}
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Account */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex flex-col items-center text-slate-700 hover:text-[#E52521] transition-colors group min-h-[44px] justify-center"
            >
              <User className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-semibold mt-0.5 hidden sm:inline">
                {user ? user.name || 'Account' : 'Sign In'}
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex flex-col items-center text-slate-700 hover:text-[#E52521] transition-colors group min-h-[44px] justify-center"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-semibold mt-0.5 hidden sm:inline">Wishlist</span>
            </Link>

            {/* Cart with live item count */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center text-slate-700 hover:text-[#E52521] transition-colors group min-h-[44px] justify-center"
              title="Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] bg-[#E52521] text-white text-[11px] font-black rounded-full flex items-center justify-center px-1 shadow-xs font-mono tabular-nums">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold mt-0.5 hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Input with Live Autocomplete Suggestions */}
        <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchFocused(false);
                }}
                placeholder="Search spare parts, model or product..."
                className="w-full pl-9 pr-22 py-2.5 text-xs text-slate-900 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white placeholder:text-slate-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-18 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#E52521] text-white rounded text-xs font-bold"
              >
                Search
              </button>
            </div>
          </form>
          {renderSuggestionsDropdown()}
        </div>
      </div>

      {/* ── 3. CATEGORY NAVIGATION (Clean horizontal menu + WhatsApp Order) ── */}
      <nav className="border-b border-[#E2E8F0] bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 py-2.5">
            {/* All Categories Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="inline-flex items-center gap-2 bg-[#0D0E11] hover:bg-[#1E2026] text-white px-4 py-2 rounded text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                <Layers className="w-4 h-4 text-[#E52521]" />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 max-h-96 overflow-y-auto bg-white border border-[#E2E8F0] rounded-md shadow-lg py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setIsCategoryOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-slate-800 hover:bg-slate-50 hover:text-[#E52521] transition-colors"
                    >
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#E2E8F0] mt-1 pt-1 sticky bottom-0 bg-white">
                    <Link
                      href="/categories"
                      onClick={() => setIsCategoryOpen(false)}
                      className="block px-4 py-2.5 text-xs sm:text-sm font-bold text-[#E52521] hover:bg-red-50 text-center"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Clean Horizontal Navigation with clear, comfortable font size */}
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-800">
              <Link href="/" className="hover:text-[#E52521] transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-[#E52521] transition-colors">
                Shop
              </Link>
              <Link href="/categories" className="hover:text-[#E52521] transition-colors">
                Categories
              </Link>
              <Link href="/brands" className="hover:text-[#E52521] transition-colors">
                Brands
              </Link>
              <Link href="/model-explorer" className="hover:text-[#E52521] transition-colors flex items-center gap-1.5">
                <span>Models</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#E52521] border border-red-200">
                  FINDER
                </span>
              </Link>
              <Link href="/wholesale" className="hover:text-[#E52521] transition-colors">
                Wholesale
              </Link>
              <Link href="/shop?filter=sale" className="hover:text-[#C61E1A] transition-colors font-bold text-[#E52521] flex items-center gap-1">
                <span>Offers</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E52521]" />
              </Link>
              <Link href="/contact" className="hover:text-[#E52521] transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Prominent WhatsApp Order Button */}
          <Link
            href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20want%20to%20place%20a%20spare%20parts%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z"/>
            </svg>
            <span>WhatsApp Order</span>
          </Link>
        </div>
      </nav>

      {/* ── 4. MOBILE DRAWER MENU ────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2E8F0] bg-white p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* User Account / Auth Status in Mobile Menu */}
          <div className="p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-[#E52521] flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name || 'Technician Account'}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{user.phone}</div>
                  </div>
                </div>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2.5 py-1.5 bg-[#E52521] text-white text-[11px] font-bold rounded-md"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                  <span>Sign In or Register</span>
                  <span className="text-[10px] text-emerald-700 font-bold">Wholesale Rates</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 px-3 text-center bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-800 hover:bg-slate-50 min-h-[40px] flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 px-3 text-center bg-[#E52521] text-white rounded-md text-xs font-bold hover:bg-[#C61E1A] min-h-[40px] flex items-center justify-center shadow-xs"
                  >
                    + Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1 text-xs font-semibold text-slate-800">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Shop All Products
            </Link>
            <Link
              href="/model-explorer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-md bg-red-50 text-[#E52521] font-bold min-h-[44px]"
            >
              <span>Find Parts by Phone Model</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#E52521] text-white">
                FINDER
              </span>
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Brands
            </Link>
            <Link
              href="/wholesale"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center font-bold text-[#E52521]"
            >
              Wholesale Pricing
            </Link>
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Track Order
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md hover:bg-slate-50 min-h-[44px] flex items-center"
            >
              Contact &amp; Help
            </Link>
          </div>

          <Link
            href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20want%20to%20order%20spare%20parts."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#25D366] text-white font-bold text-xs shadow-xs min-h-[44px]"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 2.796.948h.005c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm7.399 5.766c-.001 4.08-3.32 7.398-7.401 7.398-1.242 0-2.457-.321-3.535-.931l-3.921 1.028 1.047-3.821c-.672-1.119-1.026-2.408-1.026-3.674 0-4.08 3.32-7.399 7.401-7.399 4.081 0 7.4 3.32 7.401 7.399zm-4.321 2.399c-.198-.1-.403-.153-.611-.153-.207 0-.411.053-.61.153l-.865.433c-.2.1-.403.153-.611.153-.208 0-.411-.053-.61-.153l-1.745-1.745c-.1-.198-.153-.403-.153-.611 0-.207.053-.411.153-.61l.433-.865c.1-.198.153-.403.153-.611 0-.207-.053-.411-.153-.61l-.974-.974c-.199-.199-.523-.199-.722 0l-.88.88c-.53.53-.787 1.272-.693 2.016.141 1.118.82 2.569 2.452 4.202 1.633 1.632 3.084 2.311 4.202 2.452.744.094 1.486-.163 2.016-.693l.88-.88c.199-.199.199-.523 0-.722l-.974-.974z"/>
            </svg>
            <span>Order via WhatsApp</span>
          </Link>
        </div>
      )}
    </header>
  );
}
