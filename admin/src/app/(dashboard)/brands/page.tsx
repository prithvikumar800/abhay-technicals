'use client';

import React, { useState } from 'react';
import { Tag, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { mockBrands } from '../../../lib/mock-data';
import { AdminBrand } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export default function BrandsPage() {
  const [brands, setBrands] = useState<AdminBrand[]>(mockBrands);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingBrand(null);
    setName('');
    setSlug('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (b: AdminBrand) => {
    setEditingBrand(b);
    setName(b.name);
    setSlug(b.slug);
    setIsActive(b.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editingBrand.id ? { ...b, name, slug, isActive } : b))
      );
    } else {
      const newBrand: AdminBrand = {
        id: Date.now(),
        name,
        slug,
        logoUrl: null,
        isActive,
        modelCount: 0,
      };
      setBrands((prev) => [...prev, newBrand]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Brand Registry</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage supported OEM brands (Apple, Vivo, Realme, Oppo, Xiaomi, Samsung, etc.).
          </p>
        </div>
        <Button onClick={openCreateModal} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Brand
        </Button>
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4">Device Models Registered</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-border-subtle flex items-center justify-center font-bold text-brand-primary text-xs">
                      {brand.name[0]}
                    </div>
                    <span className="font-semibold text-content-primary">{brand.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-content-muted">{brand.slug}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-800 border border-sky-200">
                    {brand.modelCount} Models
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      brand.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {brand.isActive ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                    {brand.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(brand)}
                      className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                      title="Edit Brand"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="p-1 rounded text-content-secondary hover:text-status-error hover:bg-rose-50 transition-colors"
                      title="Delete Brand"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBrand ? 'Edit Brand' : 'Register New Brand'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-content-primary mb-1">Brand Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingBrand) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }}
              required
              placeholder="e.g. Motorola"
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div>
            <label className="block font-medium text-content-primary mb-1">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="e.g. motorola"
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="brandActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="brandActive" className="text-content-primary font-medium cursor-pointer">
              Active in storefront filter list
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Brand
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
