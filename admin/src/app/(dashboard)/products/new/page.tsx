'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Layers,
  Tag,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { mockCategories, mockBrands, mockModels } from '../../../../lib/mock-data';
import { Button } from '../../../../components/ui/Button';

interface WholesaleTierInput {
  id: string;
  minQuantity: number;
  tierPrice: number;
}

export default function NewProductPage() {
  const router = useRouter();

  // Basic Information
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState<number>(mockCategories[0]?.id || 1);
  const [brandId, setBrandId] = useState<number>(mockBrands[0]?.id || 1);
  const [qualityGrade, setQualityGrade] = useState('OEM Tested');
  const [isActive, setIsActive] = useState(true);

  // Pricing & Inventory
  const [retailPrice, setRetailPrice] = useState<number>(450);
  const [salePrice, setSalePrice] = useState<number | ''>('');
  const [stockQty, setStockQty] = useState<number>(50);
  const [minOrderQty, setMinOrderQty] = useState<number>(1);
  const [weightGrams, setWeightGrams] = useState<number>(80);

  // Device Model Compatibility (Multi-select)
  const [selectedModelIds, setSelectedModelIds] = useState<number[]>([1]);

  // Wholesale Tiers
  const [tiers, setTiers] = useState<WholesaleTierInput[]>([
    { id: '1', minQuantity: 5, tierPrice: 380 },
    { id: '2', minQuantity: 10, tierPrice: 340 },
  ]);

  // Validation & Submission
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-')) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const handleAddModel = (id: number) => {
    if (!selectedModelIds.includes(id)) {
      setSelectedModelIds([...selectedModelIds, id]);
    }
  };

  const handleRemoveModel = (id: number) => {
    setSelectedModelIds(selectedModelIds.filter((m) => m !== id));
  };

  const handleAddTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const nextMin = lastTier ? lastTier.minQuantity + 5 : 5;
    const nextPrice = lastTier ? Math.max(1, lastTier.tierPrice - 20) : retailPrice * 0.9;
    setTiers([...tiers, { id: Date.now().toString(), minQuantity: nextMin, tierPrice: Math.round(nextPrice) }]);
  };

  const handleRemoveTier = (id: string) => {
    setTiers(tiers.filter((t) => t.id !== id));
  };

  const handleUpdateTier = (id: string, field: 'minQuantity' | 'tierPrice', value: number) => {
    setTiers(
      tiers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const validateForm = (): boolean => {
    const errs: string[] = [];

    if (!sku.trim()) errs.push('SKU is required.');
    if (!title.trim()) errs.push('Product title is required.');
    if (!slug.trim()) errs.push('Product URL slug is required.');
    if (retailPrice <= 0) errs.push('Retail price must be greater than zero.');
    if (salePrice !== '' && Number(salePrice) >= retailPrice) {
      errs.push('Sale price must be lower than the standard retail price.');
    }
    if (minOrderQty < 1) errs.push('Minimum Order Quantity (MOQ) must be at least 1.');
    if (weightGrams <= 0) errs.push('Weight in grams must be greater than 0 (required for Delhivery rate calculation).');

    // Validate Wholesale Tiers
    // Sort copy by minQuantity
    const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
    for (let i = 0; i < sorted.length; i++) {
      const t = sorted[i];
      if (t.minQuantity <= 1) {
        errs.push(`Wholesale tier minimum quantity must be > 1 (tier at ${t.minQuantity} pcs).`);
      }
      if (t.tierPrice >= retailPrice) {
        errs.push(`Wholesale tier price (₹${t.tierPrice}) must be lower than retail price (₹${retailPrice}).`);
      }
      if (i > 0) {
        const prev = sorted[i - 1];
        if (t.minQuantity === prev.minQuantity) {
          errs.push(`Duplicate wholesale minimum quantity found: ${t.minQuantity} pcs.`);
        }
        if (t.tierPrice >= prev.tierPrice) {
          errs.push(
            `Wholesale price for ${t.minQuantity}+ pcs (₹${t.tierPrice}) must be strictly lower than ${prev.minQuantity}+ pcs (₹${prev.tierPrice}).`
          );
        }
      }
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate save to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setTimeout(() => {
        router.push('/products');
      }, 1200);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
        <span className="text-xs font-mono text-content-muted">
          Catalogue Mode: <span className="text-brand-accent">Production Ready (Node 20 LTS)</span>
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-content-primary">Create New Catalogue Item</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Add spare parts, configure retail & wholesale tiers, and assign device compatibility.
        </p>
      </div>

      {/* Error / Success Alerts */}
      {errors.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1 text-xs text-red-700">
          <div className="font-semibold flex items-center gap-1.5 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span>Please resolve the following validation issues:</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-800">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Product and wholesale tier configuration successfully registered! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Core Product Identification */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-2">
            <Tag className="w-4 h-4 text-brand-accent" />
            <span>Product Identification & Classification</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block font-medium text-content-primary mb-1">
                Product Title <span className="text-status-error">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. iPhone 6G Battery 1810mAh OEM Tested"
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Stock Keeping Unit (SKU) <span className="text-status-error">*</span>
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                placeholder="e.g. BAT-IP6G-01"
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Slug */}
            <div className="sm:col-span-2">
              <label className="block font-medium text-content-primary mb-1">
                URL Slug <span className="text-status-error">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="iphone-6g-battery-1810mah"
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Quality Grade / Testing
              </label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value)}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <option value="OEM Tested">OEM Tested (Premium)</option>
                <option value="Original Quality">Original Quality</option>
                <option value="Service Pack">Service Pack Official</option>
                <option value="High Copy / Compatible">High Copy Compatible</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Primary Category <span className="text-status-error">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block font-medium text-content-primary mb-1">Device Brand</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                {mockBrands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3 pt-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
              <span className="font-semibold text-content-primary">
                {isActive ? 'Active on Storefront & API' : 'Draft / Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Logistics */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-2">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span>Retail Pricing & Physical Shipping Specs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* Retail Price */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Retail Price (₹) <span className="text-status-error">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={retailPrice}
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono font-semibold text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Sale Price */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Sale Price (₹) <span className="text-content-muted font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Leave blank if none"
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Current Inventory Stock <span className="text-status-error">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={stockQty}
                onChange={(e) => setStockQty(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono font-semibold text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* MOQ */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Minimum Order Qty (MOQ)
              </label>
              <input
                type="number"
                min="1"
                value={minOrderQty}
                onChange={(e) => setMinOrderQty(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>

            {/* Weight in Grams */}
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Weight (Grams) <span className="text-status-error">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={weightGrams}
                onChange={(e) => setWeightGrams(Number(e.target.value))}
                required
                title="Crucial for Delhivery automated freight calculation"
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Multi-Model Device Compatibility */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h2 className="text-sm font-bold text-content-primary flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-accent" />
              <span>Device Model Compatibility</span>
            </h2>
            <span className="text-xs text-content-muted">Assign all phone models this spare part supports</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Active Selected Badges */}
            <div className="flex flex-wrap gap-2 p-3 bg-surface-subtle rounded-lg border border-border-subtle min-h-[50px] items-center">
              {selectedModelIds.length === 0 ? (
                <span className="text-content-muted text-xs">No specific models assigned. Item is universal.</span>
              ) : (
                selectedModelIds.map((id) => {
                  const m = mockModels.find((model) => model.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-medium text-xs shadow-xs"
                    >
                      <span>
                        {m ? `${m.brandName} ${m.name}` : `Model #${id}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveModel(id)}
                        className="text-slate-400 hover:text-status-error"
                      >
                        ×
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            {/* Quick Add Model Selection */}
            <div className="flex items-center gap-2">
              <select
                id="modelSelect"
                className="py-1.5 px-3 bg-surface-subtle border border-border-subtle rounded-lg text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                {mockModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.brandName} — {m.name}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const sel = document.getElementById('modelSelect') as HTMLSelectElement;
                  if (sel) handleAddModel(Number(sel.value));
                }}
              >
                Add Model Compatibility
              </Button>
            </div>
          </div>
        </div>

        {/* Section 4: Wholesale Pricing Tier Slabs */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <div>
              <h2 className="text-sm font-bold text-content-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-accent" />
                <span>Dedicated Wholesale Quantity Slabs</span>
              </h2>
              <p className="text-[11px] text-content-secondary mt-0.5">
                Current Global Mode: <strong className="text-brand-accent">LOGIN_GATED</strong> (Technicians only see these tiers once authenticated)
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleAddTier}>
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Tier Slab
            </Button>
          </div>

          <div className="space-y-3">
            {tiers.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-content-muted">
                No wholesale tier pricing added. All customers and technicians will pay the retail price of ₹
                {retailPrice.toFixed(2)}.
              </div>
            ) : (
              <div className="border border-border-subtle rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle font-medium text-content-secondary border-b border-border-subtle">
                    <tr>
                      <th className="py-2.5 px-4">Tier</th>
                      <th className="py-2.5 px-4">Minimum Quantity</th>
                      <th className="py-2.5 px-4">Unit Wholesale Price (₹)</th>
                      <th className="py-2.5 px-4">Effective Discount</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {tiers.map((t, idx) => {
                      const discount = (
                        ((retailPrice - t.tierPrice) / retailPrice) *
                        100
                      ).toFixed(1);
                      return (
                        <tr key={t.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-bold text-content-primary">Tier {idx + 1}</td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="2"
                                value={t.minQuantity}
                                onChange={(e) =>
                                  handleUpdateTier(t.id, 'minQuantity', Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 bg-surface-subtle border border-border-subtle rounded font-mono font-medium focus:ring-2 focus:ring-brand-accent focus:outline-none"
                              />
                              <span className="text-content-secondary font-mono">pcs and above</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-content-secondary font-mono">₹</span>
                              <input
                                type="number"
                                step="0.01"
                                min="1"
                                value={t.tierPrice}
                                onChange={(e) =>
                                  handleUpdateTier(t.id, 'tierPrice', Number(e.target.value))
                                }
                                className="w-28 px-2 py-1 bg-surface-subtle border border-border-subtle rounded font-mono font-bold text-emerald-600 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                              />
                            </div>
                          </td>
                          <td className="py-2.5 px-4 font-mono text-emerald-700">
                            {Number(discount) > 0 ? `-${discount}% off` : '0%'}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveTier(t.id)}
                              className="p-1 rounded text-content-muted hover:text-status-error transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            <Save className="w-4 h-4 mr-1.5" />
            <span>Save & Publish Product</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
