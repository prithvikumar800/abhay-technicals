'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { mockProducts, mockCategories, mockBrands } from '../../../lib/mock-data';
import { AdminProduct, AdminCategory, AdminBrand } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

function normalizeAdminProduct(p: any): AdminProduct {
  const images: any[] = p.images || [];

  return {
    id: p.id,
    sku: p.sku || `AT-WC-${p.id}`,
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
    sourceId: p.sourceId || null,
    sourceUrl: p.sourceUrl || null,
    images,
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
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [categories, setCategories] = useState<any[]>(mockCategories);
  const [brands, setBrands] = useState<any[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [stockFilter, setStockFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(mockProducts.length);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 15;

  const [viewProduct, setViewProduct] = useState<AdminProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

  // 1. Fetch categories and brands on mount
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
        // Fall back to mock
      }
    }
    fetchTaxonomies();
  }, [apiBaseUrl]);

  // 2. Fetch live products from API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(pageSize));

      if (searchTerm.trim()) {
        params.set('search', searchTerm.trim());
      }
      if (selectedCategory && selectedCategory !== 'ALL') {
        params.set('categorySlug', selectedCategory);
      }
      if (selectedBrand && selectedBrand !== 'ALL') {
        params.set('brandSlug', selectedBrand);
      }

      const res = await fetch(`${apiBaseUrl}/products?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch error');

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        let items: AdminProduct[] = json.data.map(normalizeAdminProduct);

        // Apply local stock and status filters if needed
        if (stockFilter === 'LOW_STOCK') {
          items = items.filter((p) => p.stockQty <= 10 && p.stockQty > 0);
        } else if (stockFilter === 'OUT_OF_STOCK') {
          items = items.filter((p) => p.stockQty === 0);
        } else if (stockFilter === 'IN_STOCK') {
          items = items.filter((p) => p.stockQty > 10);
        }

        if (statusFilter === 'ACTIVE') {
          items = items.filter((p) => p.isActive === true);
        } else if (statusFilter === 'INACTIVE') {
          items = items.filter((p) => p.isActive === false);
        }

        setProducts(items);

        const pagination = json.meta?.pagination;
        if (pagination) {
          setTotalItems(pagination.totalItems);
          setTotalPages(pagination.totalPages);
        } else {
          setTotalItems(items.length);
          setTotalPages(Math.ceil(items.length / pageSize) || 1);
        }
      } else {
        throw new Error('Invalid format');
      }
    } catch {
      // Fallback to client filtered mock data
      setProducts(mockProducts);
      setTotalItems(mockProducts.length);
      setTotalPages(Math.ceil(mockProducts.length / pageSize) || 1);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, currentPage, pageSize, searchTerm, selectedCategory, selectedBrand, stockFilter, statusFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-content-primary">Product Catalogue</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {totalItems.toLocaleString()} Total Products
            </span>
          </div>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage spare parts, device model compatibilities, wholesale slabs, and stock levels.
          </p>
        </div>
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-sky-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search SKU/Title */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Title, SKU (e.g. AT-WC-...), or model..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[40px]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[40px]"
            >
              <option value="ALL">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[40px]"
            >
              <option value="ALL">All Brands ({brands.length})</option>
              {brands.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[40px]"
            >
              <option value="ALL">Stock: All</option>
              <option value="IN_STOCK">In Stock (&gt;10)</option>
              <option value="LOW_STOCK">Low Stock (≤10)</option>
              <option value="OUT_OF_STOCK">Out of Stock (0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table with Live Loading */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Category & Brand</th>
                <th className="py-3 px-4">Retail / Sale</th>
                <th className="py-3 px-4">Wholesale Tiers</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-content-muted">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                    <span>Loading products from database...</span>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-content-muted">
                    No products matching your search criteria.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Title and SKU */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-content-primary">{p.title}</div>
                      <div className="text-[11px] font-mono text-content-muted mt-0.5">
                        SKU: <span className="text-brand-accent font-medium">{p.sku}</span>
                        {p.qualityGrade && ` • ${p.qualityGrade}`}
                        {p.sourceId && ` • ID: ${p.sourceId}`}
                      </div>
                    </td>

                    {/* Category & Brand */}
                    <td className="py-3 px-4">
                      <div className="text-content-primary font-medium">{p.category.name}</div>
                      <div className="text-[11px] text-content-secondary">
                        {p.brand?.name || 'Universal'}
                      </div>
                    </td>

                    {/* Prices */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-content-primary">
                        ₹{p.salePrice ? p.salePrice.toFixed(2) : p.retailPrice.toFixed(2)}
                      </div>
                      {p.salePrice && (
                        <div className="text-[10px] text-content-muted line-through font-mono">
                          ₹{p.retailPrice.toFixed(2)}
                        </div>
                      )}
                    </td>

                    {/* Wholesale Tiers */}
                    <td className="py-3 px-4">
                      {p.wholesaleTiers && p.wholesaleTiers.length > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200">
                          {p.wholesaleTiers.length} Slabs Configured
                        </span>
                      ) : (
                        <span className="text-content-muted text-[11px]">No Tiers</span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded text-[11px] ${
                          p.stockQty <= 10
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {p.stockQty <= 10 && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        {p.stockQty} pcs
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                          p.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle active state"
                      >
                        {p.isActive ? (
                          <>
                            <CheckCircle className="w-2.5 h-2.5" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-2.5 h-2.5" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setViewProduct(p)}
                          className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                          title="View Product Details & Compatibility"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/products/new?edit=${p.id}`}
                          className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1 rounded text-content-secondary hover:text-status-error hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="py-3 px-4 bg-surface-subtle border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs text-content-secondary">
          <div>
            Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems.toLocaleString()}</strong> products
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isLoading}
              className="px-2 py-1 rounded border border-border-subtle bg-surface-card hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[11px]"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
              className="p-1.5 rounded border border-border-subtle bg-surface-card hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono font-bold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || isLoading}
              className="p-1.5 rounded border border-border-subtle bg-surface-card hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isLoading}
              className="px-2 py-1 rounded border border-border-subtle bg-surface-card hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[11px]"
            >
              Last ({totalPages})
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {viewProduct && (
        <Modal
          isOpen={!!viewProduct}
          onClose={() => setViewProduct(null)}
          title={`Product: ${viewProduct.title}`}
        >
          <div className="space-y-4 text-xs">
            {/* Image Preview & Meta */}
            {viewProduct.images && viewProduct.images.length > 0 && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      typeof viewProduct.images[0] === 'string'
                        ? viewProduct.images[0]
                        : (viewProduct.images[0] as any).imageUrl
                    }
                    alt={viewProduct.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <p className="font-bold text-slate-900 truncate">{viewProduct.title}</p>
                  {viewProduct.sourceUrl && (
                    <a
                      href={viewProduct.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
                    >
                      <span>View on Source Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 p-3 bg-surface-subtle rounded-lg border border-border-subtle">
              <div>
                <span className="text-content-muted">SKU:</span>
                <p className="font-mono font-bold text-content-primary">{viewProduct.sku}</p>
              </div>
              <div>
                <span className="text-content-muted">Category:</span>
                <p className="font-semibold text-content-primary">{viewProduct.category.name}</p>
              </div>
              <div>
                <span className="text-content-muted">Retail Price:</span>
                <p className="font-semibold text-content-primary">₹{viewProduct.retailPrice.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-content-muted">Sale Price:</span>
                <p className="font-semibold text-emerald-600">
                  {viewProduct.salePrice ? `₹${viewProduct.salePrice.toFixed(2)}` : 'None'}
                </p>
              </div>
              <div>
                <span className="text-content-muted">Stock Quantity:</span>
                <p className="font-bold text-content-primary">{viewProduct.stockQty} pcs</p>
              </div>
              <div>
                <span className="text-content-muted">Min Order Qty (MOQ):</span>
                <p className="font-semibold text-content-primary">{viewProduct.minOrderQty} pcs</p>
              </div>
            </div>

            {/* Compatible Device Models */}
            <div>
              <h4 className="font-semibold text-content-primary mb-2">Compatible Device Models</h4>
              <div className="flex flex-wrap gap-1.5">
                {viewProduct.compatibleModels && viewProduct.compatibleModels.length > 0 ? (
                  viewProduct.compatibleModels.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[11px]"
                    >
                      {m.brandName} {m.name}
                    </span>
                  ))
                ) : (
                  <span className="text-content-muted">Universal compatibility or none assigned.</span>
                )}
              </div>
            </div>

            {/* Wholesale Pricing Slabs */}
            <div>
              <h4 className="font-semibold text-content-primary mb-2">Configured Wholesale Slabs</h4>
              <div className="border border-border-subtle rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle font-medium text-content-secondary">
                    <tr>
                      <th className="py-2 px-3">Minimum Quantity</th>
                      <th className="py-2 px-3">Wholesale Unit Price</th>
                      <th className="py-2 px-3">Discount Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {viewProduct.wholesaleTiers && viewProduct.wholesaleTiers.length > 0 ? (
                      viewProduct.wholesaleTiers.map((t) => {
                        const discount = (
                          ((viewProduct.retailPrice - t.tierPrice) / viewProduct.retailPrice) *
                          100
                        ).toFixed(1);
                        return (
                          <tr key={t.id}>
                            <td className="py-2 px-3 font-mono font-medium">{t.minQuantity}+ pcs</td>
                            <td className="py-2 px-3 font-mono font-bold text-emerald-600">
                              ₹{t.tierPrice.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-content-muted">Save {discount}%</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-3 px-3 text-content-muted text-center">
                          No wholesale slabs assigned. Standard retail price applies.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setViewProduct(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <Modal
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          title="Confirm Catalogue Removal"
        >
          <div className="space-y-4 text-xs">
            <p className="text-content-secondary">
              Are you sure you want to remove <strong className="text-content-primary">{productToDelete.title}</strong>{' '}
              (SKU: <span className="font-mono text-brand-accent">{productToDelete.sku}</span>)?
            </p>
            <p className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800">
              <strong>Caution:</strong> Deletion will deactivate this SKU across active customer carts.
              Historical order line items are permanently preserved and will not be altered.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setProductToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={confirmDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
