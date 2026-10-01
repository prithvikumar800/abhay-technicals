'use client';

import React, { useState } from 'react';
import { Smartphone, Plus, Edit, Trash2, CheckCircle, XCircle, Search } from 'lucide-react';
import { mockModels, mockBrands } from '../../../lib/mock-data';
import { AdminDeviceModel } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export default function ModelsPage() {
  const [models, setModels] = useState<AdminDeviceModel[]>(mockModels);
  const [selectedBrandId, setSelectedBrandId] = useState<number | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<AdminDeviceModel | null>(null);

  // Form states
  const [brandId, setBrandId] = useState<number>(mockBrands[0]?.id || 1);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [releaseYear, setReleaseYear] = useState<number>(2024);
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingModel(null);
    setBrandId(mockBrands[0]?.id || 1);
    setName('');
    setSlug('');
    setReleaseYear(2024);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (m: AdminDeviceModel) => {
    setEditingModel(m);
    setBrandId(m.brandId);
    setName(m.name);
    setSlug(m.slug);
    setReleaseYear(m.releaseYear || 2024);
    setIsActive(m.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const brand = mockBrands.find((b) => b.id === brandId);
    const brandName = brand ? brand.name : 'Unknown Brand';

    if (editingModel) {
      setModels((prev) =>
        prev.map((m) =>
          m.id === editingModel.id
            ? { ...m, brandId, brandName, name, slug, releaseYear, isActive }
            : m
        )
      );
    } else {
      const newModel: AdminDeviceModel = {
        id: Date.now(),
        brandId,
        brandName,
        name,
        slug,
        releaseYear,
        isActive,
        productCount: 0,
      };
      setModels((prev) => [...prev, newModel]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setModels((prev) => prev.filter((m) => m.id !== id));
  };

  const filteredModels = models.filter((m) => {
    const matchesBrand = selectedBrandId === 'ALL' || m.brandId === selectedBrandId;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brandName.toLowerCase().includes(search.toLowerCase()) ||
      m.slug.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Device Model Directory</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Register smartphone and tablet models to map spare parts compatibility accurately.
          </p>
        </div>
        <Button onClick={openCreateModal} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Device Model
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search device models (e.g. Vivo Y11, iPhone 6G)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedBrandId}
            onChange={(e) =>
              setSelectedBrandId(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
            }
            className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option value="ALL">All Brands</option>
            {mockBrands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Device Model</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4">Release Year</th>
              <th className="py-3 px-4">Mapped Compatible Parts</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredModels.map((model) => (
              <tr key={model.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-content-primary flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{model.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-content-secondary font-medium">{model.brandName}</td>
                <td className="py-3 px-4 font-mono text-content-muted">{model.slug}</td>
                <td className="py-3 px-4 font-mono text-content-secondary">
                  {model.releaseYear || '—'}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-800 border border-sky-200">
                    {model.productCount} Compatible Parts
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      model.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {model.isActive ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                    {model.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(model)}
                      className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                      title="Edit Model"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(model.id)}
                      className="p-1 rounded text-content-secondary hover:text-status-error hover:bg-rose-50 transition-colors"
                      title="Delete Model"
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
        title={editingModel ? 'Edit Device Model' : 'Register New Device Model'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-content-primary mb-1">Brand</label>
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

          <div>
            <label className="block font-medium text-content-primary mb-1">Model Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingModel) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }}
              required
              placeholder="e.g. Vivo Y11 2019"
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-content-primary mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="e.g. vivo-y11-2019"
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
            <div>
              <label className="block font-medium text-content-primary mb-1">Release Year</label>
              <input
                type="number"
                min="2010"
                max="2030"
                value={releaseYear}
                onChange={(e) => setReleaseYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="modelActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="modelActive" className="text-content-primary font-medium cursor-pointer">
              Active in storefront device search & model selector
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Device Model
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
