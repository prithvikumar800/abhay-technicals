'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { mockProducts, mockCategories, mockBrands } from '../../lib/mock-data';
import { ProductCard } from '../../components/product/ProductCard';
import { StorefrontProduct } from '../../types';

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

interface ApiBrand {
  id: number;
  name: string;
  slug: string;
}

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
    wholesaleTiers: p.wholesaleTiers || [],
  };
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialBrand = searchParams.get('brand') || 'ALL';
  const initialModel = searchParams.get('model') || 'ALL';
  const initialSearch = searchParams.get('q') || '';

  const [products, setProducts] = useState<StorefrontProduct[]>(mockProducts);
  const [categories, setCategories] = useState<ApiCategory[]>(mockCategories);
  const [brands, setBrands] = useState<ApiBrand[]>(mockBrands);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedModel, setSelectedModel] = useState<string>(initialModel);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(mockProducts.length);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageSize = 16;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  // 1. Fetch live categories and brands on mount
  useEffect(() => {
    async function fetchTaxonomies() {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch(`${apiBaseUrl}/categories`).then((r) => r.json()).catch(() => null),
          fetch(`${apiBaseUrl}/brands`).then((r) => r.json()).catch(() => null),
        ]);

        if (catRes?.success && Array.isArray(catRes.data) && catRes.data.length > 0) {
          setCategories(catRes.data);
        }
        if (brandRes?.success && Array.isArray(brandRes.data) && brandRes.data.length > 0) {
          setBrands(brandRes.data);
        }
      } catch {
        // Fall back to default mock data gracefully
      }
    }
    fetchTaxonomies();
  }, [apiBaseUrl]);

  // 2. Fetch live products from API with server pagination
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(pageSize));

      if (selectedCategory && selectedCategory !== 'ALL') {
        params.set('categorySlug', selectedCategory);
      }
      if (selectedBrand && selectedBrand !== 'ALL') {
        params.set('brandSlug', selectedBrand);
      }
      if (selectedModel && selectedModel !== 'ALL') {
        params.set('modelSlug', selectedModel);
      }
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }

      const res = await fetch(`${apiBaseUrl}/products?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const normalized: StorefrontProduct[] = json.data.map(normalizeApiProduct);

        // Client-side sort if requested
        if (sortBy === 'price-low') {
          normalized.sort((a: StorefrontProduct, b: StorefrontProduct) => (a.salePrice ?? a.retailPrice) - (b.salePrice ?? b.retailPrice));
        } else if (sortBy === 'price-high') {
          normalized.sort((a: StorefrontProduct, b: StorefrontProduct) => (b.salePrice ?? b.retailPrice) - (a.salePrice ?? a.retailPrice));
        }

        const filtered = inStockOnly ? normalized.filter((p: StorefrontProduct) => p.stockQty > 0) : normalized;
        setProducts(filtered);

        const pagination = json.meta?.pagination;
        if (pagination) {
          setTotalItems(pagination.totalItems);
          setTotalPages(pagination.totalPages);
        } else {
          setTotalItems(filtered.length);
          setTotalPages(Math.ceil(filtered.length / pageSize) || 1);
        }
      } else {
        throw new Error('Invalid API response');
      }
    } catch {
      // Fallback to client filtered mock data
      const filtered = mockProducts.filter((p) => {
        const matchesCategory = selectedCategory === 'ALL' || p.category.slug === selectedCategory;
        const matchesBrand = selectedBrand === 'ALL' || p.brand?.slug === selectedBrand;
        const matchesQuery = !searchQuery.trim() || p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !inStockOnly || p.stockQty > 0;
        return matchesCategory && matchesBrand && matchesQuery && matchesStock;
      });
      setProducts(filtered);
      setTotalItems(filtered.length);
      setTotalPages(Math.ceil(filtered.length / pageSize) || 1);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, currentPage, pageSize, selectedCategory, selectedBrand, selectedModel, searchQuery, sortBy, inStockOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedBrand('ALL');
    setSelectedModel('ALL');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'ALL' ||
    selectedBrand !== 'ALL' ||
    selectedModel !== 'ALL' ||
    searchQuery !== '' ||
    inStockOnly ||
    sortBy !== 'featured';

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mobile Spare Parts Catalogue</h1>
          <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-red-50 text-[#E52521] rounded-full border border-red-100 font-mono">
            {totalItems.toLocaleString()} Products Available
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Precision OEM replacement components filtered by brand, category, and exact phone model.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card animate-fade-in-up delay-75 p-4 sm:p-5 rounded-xl border border-border-subtle shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by model, part name, or SKU (e.g. Vivo Y21, Oppo F3)..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52521] min-h-[44px]"
            />
          </div>

          {/* Category Dropdown (All 23 Categories) */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-sm font-medium bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52521] min-h-[44px]"
            >
              <option value="ALL">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Dropdown (All 15 Brands) */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-sm font-medium bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52521] min-h-[44px]"
            >
              <option value="ALL">All Brands ({brands.length})</option>
              {brands.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 text-sm font-medium bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52521] min-h-[44px]"
            >
              <option value="featured">Featured Parts</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Second Row: In-stock toggle and Clear Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border-subtle text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-800">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="rounded border-slate-300 text-[#E52521] focus:ring-[#E52521] w-4 h-4"
            />
            <span className="font-semibold">In Stock Only (Ready for Immediate Dispatch)</span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-sm font-bold text-rose-600 hover:text-rose-800"
            >
              <X className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Count Banner */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalItems.toLocaleString()}</strong> precision replacement parts
        </span>
        <span className="font-mono text-xs sm:text-sm text-slate-500">
          Wholesale: <strong className="text-slate-900 font-bold">Automatic Volume Slabs</strong>
        </span>
      </div>

      {/* Product Cards Grid with Loading State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#E52521]" />
          <p className="text-sm font-medium">Loading precision catalogue from database...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="p-12 text-center bg-surface-card rounded-2xl border border-border-subtle space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-900">
            No spare parts match your selected filters.
          </p>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Try adjusting your brand, category, or search term to locate the component you need.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#E52521] text-white text-sm font-bold rounded-lg hover:bg-[#C61E1A] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in delay-150">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="py-6 flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1 || isLoading}
            className="px-3.5 py-2 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] font-bold"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
            className="p-2 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Indicators */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = currentPage - 2 + i;
            if (pageNum < 1) pageNum = i + 1;
            if (pageNum > totalPages) pageNum = totalPages - (4 - i);
            if (pageNum < 1 || pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                disabled={isLoading}
                className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg font-bold border transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[#0D0E11] text-white border-[#0D0E11]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || isLoading}
            className="px-3.5 py-2 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] font-bold"
          >
            Last ({totalPages})
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
