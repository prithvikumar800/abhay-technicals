'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, CheckCircle2, ArrowRight, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import { mockBrands, mockModels, mockCategories } from '../../lib/mock-data';

interface BrandItem {
  id: number;
  name: string;
  slug: string;
}

interface ModelItem {
  id: number;
  brandId: number;
  name: string;
  slug: string;
  releaseYear?: number | null;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

export function ModelExplorer() {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  const [brands, setBrands] = useState<BrandItem[]>(mockBrands);
  const [models, setModels] = useState<ModelItem[]>(mockModels);
  const [categories, setCategories] = useState<CategoryItem[]>(mockCategories);

  const [selectedBrandId, setSelectedBrandId] = useState<number>(mockBrands[0]?.id || 1);
  const [selectedModelId, setSelectedModelId] = useState<number>(mockModels[0]?.id || 1);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('ALL');
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);

  // 1. Fetch live brands & categories
  useEffect(() => {
    fetch(`${apiBaseUrl}/brands`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length > 0) {
          setBrands(d.data);
          if (!d.data.some((b: BrandItem) => b.id === selectedBrandId)) {
            setSelectedBrandId(d.data[0].id);
          }
        }
      })
      .catch(() => {});

    fetch(`${apiBaseUrl}/categories`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length > 0) {
          setCategories(d.data);
        }
      })
      .catch(() => {});
  }, [apiBaseUrl, selectedBrandId]);

  // 2. Fetch live models whenever selectedBrandId changes
  useEffect(() => {
    if (!selectedBrandId) return;
    setIsLoadingModels(true);
    fetch(`${apiBaseUrl}/brands/${selectedBrandId}/models`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length > 0) {
          setModels(d.data);
          setSelectedModelId(d.data[0].id);
        } else {
          const fallback = mockModels.filter((m) => m.brandId === selectedBrandId);
          setModels(fallback);
          if (fallback[0]) setSelectedModelId(fallback[0].id);
        }
      })
      .catch(() => {
        const fallback = mockModels.filter((m) => m.brandId === selectedBrandId);
        setModels(fallback);
        if (fallback[0]) setSelectedModelId(fallback[0].id);
      })
      .finally(() => {
        setIsLoadingModels(false);
      });
  }, [selectedBrandId, apiBaseUrl]);

  const handleBrandChange = (id: number) => {
    setSelectedBrandId(id);
  };

  const handleSearchCompatibleParts = (e: React.FormEvent) => {
    e.preventDefault();
    const model = models.find((m) => m.id === selectedModelId);
    const brand = brands.find((b) => b.id === selectedBrandId);
    if (model) {
      let url = `/shop?model=${model.slug}`;
      if (brand) {
        url += `&brand=${brand.slug}`;
      }
      if (selectedCategorySlug !== 'ALL') {
        url += `&category=${selectedCategorySlug}`;
      }
      router.push(url);
    }
  };

  const currentBrand = brands.find((b) => b.id === selectedBrandId);
  const currentModel = models.find((m) => m.id === selectedModelId);

  return (
    <div className="bg-white rounded-md border border-[#E2E8F0] shadow-xs p-5 sm:p-7">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left 8 Cols: Form & Selectors */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-[#E52521] text-xs font-bold uppercase tracking-wider mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Model Compatibility Finder</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Find Parts for Your Phone
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select your device model and discover compatible spare parts.
            </p>
          </div>

          <form onSubmit={handleSearchCompatibleParts} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1: Select Brand */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700">
                  1. Brand
                </label>
                <div className="relative">
                  <select
                    value={selectedBrandId}
                    onChange={(e) => handleBrandChange(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] hover:bg-slate-100 border border-[#CBD5E1] rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Model */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 flex items-center justify-between">
                  <span>2. Model</span>
                  {isLoadingModels && <Loader2 className="w-3 h-3 text-[#E52521] animate-spin" />}
                </label>
                <div className="relative">
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(Number(e.target.value))}
                    disabled={isLoadingModels || models.length === 0}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] hover:bg-slate-100 border border-[#CBD5E1] rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} {m.releaseYear ? `(${m.releaseYear})` : ''}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 3: Select Category */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700">
                  3. Part Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategorySlug}
                    onChange={(e) => setSelectedCategorySlug(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[#F8FAFC] hover:bg-slate-100 border border-[#CBD5E1] rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E52521] focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="ALL">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button (Official Logo Crimson Red) */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-6 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs sm:text-sm rounded-md flex items-center justify-center gap-2 transition-all shadow-xs group"
            >
              <span>View Compatible Parts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right 4 Cols: Phone Preview Graphic + Trust Badges */}
        <div className="lg:col-span-4 bg-[#F8FAFC] rounded-md p-5 border border-[#E2E8F0] flex items-center justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#E52521] shrink-0" />
              <span>100% Fitment Verified</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#E52521] shrink-0" />
              <span>Zero-Cycle OEM Grade</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Clock className="w-4 h-4 text-[#E52521] shrink-0" />
              <span>Quick Dispatch in 24h</span>
            </div>
          </div>

          {/* Smartphone device badge */}
          <div className="w-20 h-28 rounded-lg border-2 border-zinc-800 bg-white shadow-xs relative shrink-0 overflow-hidden flex flex-col justify-between p-2 text-center">
            <div className="w-5 h-1 bg-zinc-300 rounded-full mx-auto" />
            <div className="space-y-0.5">
              <div className="text-[7px] font-black text-[#E52521] uppercase tracking-wider truncate">
                {currentBrand ? currentBrand.name : 'Device'}
              </div>
              <div className="text-[8px] font-bold text-slate-900 leading-tight line-clamp-2">
                {currentModel ? currentModel.name : 'Select Model'}
              </div>
            </div>
            <div className="w-3 h-3 rounded-full border border-zinc-300 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
