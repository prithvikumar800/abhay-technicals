'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { mockProducts } from '../../lib/mock-data';
import { ProductCard } from '../../components/product/ProductCard';
import { StorefrontProduct } from '../../types';

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

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<StorefrontProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    async function searchApi() {
      if (!query.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`${apiBaseUrl}/products?search=${encodeURIComponent(query.trim())}&limit=48`);
        if (!res.ok) throw new Error('Search failed');

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setResults(json.data.map(normalizeApiProduct));
        } else {
          throw new Error('Invalid format');
        }
      } catch {
        // Fallback to local filter on mockProducts
        const q = query.toLowerCase().trim();
        const fallback = mockProducts.filter((p) => {
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = p.brand?.name.toLowerCase().includes(q);
          const matchCategory = p.category.name.toLowerCase().includes(q);
          return matchTitle || matchSku || matchBrand || matchCategory;
        });
        setResults(fallback);
      } finally {
        setIsLoading(false);
      }
    }

    searchApi();
  }, [query, apiBaseUrl]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary">
          Search Results {query && <>for &ldquo;{query}&rdquo;</>}
        </h1>
        <p className="text-xs text-content-secondary mt-1">
          Found <strong>{results.length}</strong> matching spare parts across SKU, Title, and Compatible Models.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-semibold">Searching live catalogue database...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="p-12 text-center bg-surface-card rounded-2xl border border-border-subtle space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-content-primary">No Matching Spare Parts Found</h2>
          <p className="text-xs text-content-secondary leading-relaxed">
            We couldn&apos;t locate any items matching &ldquo;{query}&rdquo;. Check for spelling errors or try searching
            by broad device brand (e.g. Vivo, Realme, iPhone, Samsung).
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-dark"
          >
            <span>Browse Full Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-content-muted">Searching parts...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
