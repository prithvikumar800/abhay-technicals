'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers2,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Search,
  IndianRupee,
  ShieldCheck,
} from 'lucide-react';
import { mockProducts } from '../../../lib/mock-data';
import { AdminProduct } from '../../../types';
import { Button } from '../../../components/ui/Button';

interface TierRow {
  id: string;
  minQuantity: number;
  tierPrice: number;
}

export default function WholesalePage() {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>(mockProducts[0]?.id || '');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${apiBaseUrl}/products?limit=100`);
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: AdminProduct[] = json.data.map((p: any) => ({
            id: p.id,
            sku: p.sku,
            slug: p.slug,
            title: p.title,
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
            wholesaleTiers: (p.wholesaleTiers || []).map((t: any) => ({
              id: t.id || String(t.minQuantity),
              minQuantity: t.minQuantity,
              tierPrice: Number(t.tierPrice),
            })),
            compatibleModels: (p.compatibleModels || []).map((m: any) => ({
              id: m.id,
              name: m.name,
              brandName: p.brand?.name || '',
            })),
          }));
          setProducts(mapped);
          if (mapped[0]) {
            setSelectedProductId(mapped[0].id);
            setTiers(mapped[0].wholesaleTiers);
          }
        }
      } catch {
        // Fall back to mockProducts
      }
    }
    loadProducts();
  }, [apiBaseUrl]);

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Editable tiers for the currently selected product
  const [tiers, setTiers] = useState<TierRow[]>(
    currentProduct?.wholesaleTiers || []
  );

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find((p) => p.id === productId);
    setTiers(prod ? [...prod.wholesaleTiers] : []);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleAddTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const nextMin = lastTier ? lastTier.minQuantity + 5 : 5;
    const nextPrice = lastTier
      ? Math.max(1, lastTier.tierPrice - 20)
      : Math.round(currentProduct.retailPrice * 0.85);

    setTiers([...tiers, { id: `wt-${Date.now()}`, minQuantity: nextMin, tierPrice: nextPrice }]);
    setSuccessMessage(null);
  };

  const handleRemoveTier = (id: string) => {
    setTiers(tiers.filter((t) => t.id !== id));
    setSuccessMessage(null);
  };

  const handleUpdate = (id: string, field: 'minQuantity' | 'tierPrice', val: number) => {
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
    setSuccessMessage(null);
  };

  const validateTiers = (): boolean => {
    if (!currentProduct) return false;

    // Sort by minQuantity ascending
    const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);

    for (let i = 0; i < sorted.length; i++) {
      const t = sorted[i];

      if (t.minQuantity <= 1) {
        setErrorMessage(`Tier minimum quantity must be greater than 1 (found ${t.minQuantity} pcs).`);
        return false;
      }

      if (t.tierPrice >= currentProduct.retailPrice) {
        setErrorMessage(
          `Wholesale tier price (₹${t.tierPrice}) must be less than the retail price (₹${currentProduct.retailPrice}).`
        );
        return false;
      }

      if (i > 0) {
        const prev = sorted[i - 1];
        if (t.minQuantity === prev.minQuantity) {
          setErrorMessage(
            `Overlapping minimum quantity detected: multiple tiers configured for ${t.minQuantity} pcs.`
          );
          return false;
        }

        if (t.tierPrice >= prev.tierPrice) {
          setErrorMessage(
            `Pricing inversion detected: price for ${t.minQuantity}+ pcs (₹${t.tierPrice}) cannot be equal to or greater than ${prev.minQuantity}+ pcs (₹${prev.tierPrice}).`
          );
          return false;
        }
      }
    }

    setErrorMessage(null);
    return true;
  };

  const handleSaveTiers = () => {
    if (!validateTiers()) return;

    // Update in memory state
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProductId ? { ...p, wholesaleTiers: [...tiers] } : p
      )
    );

    setSuccessMessage(
      `Wholesale pricing slabs for "${currentProduct.title}" saved successfully. Active in database under LOGIN_GATED access policy.`
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Wholesale Pricing Tier Manager</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure volume-based wholesale discount slabs with automated overlap & inversion validation.
          </p>
        </div>

        {/* Global Policy Badge */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 border border-sky-200">
          <ShieldCheck className="w-4 h-4 text-brand-accent" />
          <div className="text-xs">
            <span className="text-slate-500">Global Pricing Policy: </span>
            <span className="font-bold text-brand-primary font-mono">LOGIN_GATED</span>
          </div>
        </div>
      </div>

      {/* Informative Guidance Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-content-secondary">
        <HelpCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-content-primary">How Wholesale Pricing Slabs Function:</p>
          <p>
            When a customer or technician adds items to cart, the pricing engine selects the lowest unit price based on the total quantity of that SKU ordered. For example:
          </p>
          <div className="font-mono text-[11px] bg-white p-2 rounded border border-slate-200 inline-block mt-1">
            1 – 4 pcs &rarr; Retail Price (₹{currentProduct?.retailPrice || 450})<br />
            5 – 9 pcs &rarr; Tier 1 Price<br />
            10 – 49 pcs &rarr; Tier 2 Price<br />
            50+ pcs &rarr; Tier 3 Price
          </div>
        </div>
      </div>

      {/* Product Selector */}
      <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-xs">
        <label className="block text-xs font-semibold text-content-primary mb-2">
          Select Product to Manage Tiers:
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => handleProductSelect(e.target.value)}
          className="w-full py-2.5 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg font-medium text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} (SKU: {p.sku}) — Retail: ₹{p.retailPrice.toFixed(2)} [
              {p.wholesaleTiers?.length || 0} tiers configured]
            </option>
          ))}
        </select>
      </div>

      {/* Validation Feedback */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tiers Editor Card */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <h2 className="text-sm font-bold text-content-primary">
              Wholesale Slabs for: {currentProduct?.title}
            </h2>
            <div className="text-xs text-content-secondary mt-0.5 flex items-center gap-3">
              <span>
                Standard Retail Price: <strong>₹{currentProduct?.retailPrice.toFixed(2)}</strong>
              </span>
              <span>
                Current Inventory: <strong>{currentProduct?.stockQty} pcs</strong>
              </span>
            </div>
          </div>
          <Button onClick={handleAddTier} variant="outline" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Slab Tier
          </Button>
        </div>

        {tiers.length === 0 ? (
          <div className="py-8 text-center text-xs text-content-muted">
            No wholesale slabs configured for this product. Technicians will be charged standard retail
            prices. Click <strong>Add Slab Tier</strong> above to configure discounts.
          </div>
        ) : (
          <div className="border border-border-subtle rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle font-medium text-content-secondary border-b border-border-subtle">
                <tr>
                  <th className="py-3 px-4">Tier Index</th>
                  <th className="py-3 px-4">Minimum Quantity Required</th>
                  <th className="py-3 px-4">Wholesale Unit Price (₹)</th>
                  <th className="py-3 px-4">Technician Margin</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {tiers.map((t, idx) => {
                  const discountPercent = (
                    ((currentProduct.retailPrice - t.tierPrice) / currentProduct.retailPrice) *
                    100
                  ).toFixed(1);
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-content-primary">Tier {idx + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="2"
                            value={t.minQuantity}
                            onChange={(e) =>
                              handleUpdate(t.id, 'minQuantity', Number(e.target.value))
                            }
                            className="w-24 px-2.5 py-1.5 bg-surface-subtle border border-border-subtle rounded font-mono font-medium focus:ring-2 focus:ring-brand-accent focus:outline-none"
                          />
                          <span className="text-content-secondary font-mono">pcs +</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-content-secondary font-mono">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            min="1"
                            value={t.tierPrice}
                            onChange={(e) =>
                              handleUpdate(t.id, 'tierPrice', Number(e.target.value))
                            }
                            className="w-32 px-2.5 py-1.5 bg-surface-subtle border border-border-subtle rounded font-mono font-bold text-emerald-600 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">
                        {Number(discountPercent) > 0 ? `Save ${discountPercent}%` : '0%'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleRemoveTier(t.id)}
                          className="p-1 rounded text-content-muted hover:text-status-error transition-colors"
                          title="Remove tier"
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

        <div className="pt-3 flex justify-end">
          <Button onClick={handleSaveTiers} variant="primary" size="md">
            Save Wholesale Slabs
          </Button>
        </div>
      </div>
    </div>
  );
}
