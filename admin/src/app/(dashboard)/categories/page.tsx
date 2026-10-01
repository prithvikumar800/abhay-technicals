'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FolderTree,
} from 'lucide-react';
import { mockCategories } from '../../../lib/mock-data';
import { AdminCategory } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setParentId(null);
    setSortOrder(categories.length + 1);
    setIsActive(true);
    setDeleteWarning(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setParentId(cat.parentId);
    setSortOrder(cat.sortOrder);
    setIsActive(cat.isActive);
    setDeleteWarning(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, slug, parentId, sortOrder, isActive }
            : c
        )
      );
    } else {
      const newCat: AdminCategory = {
        id: Date.now(),
        parentId,
        name,
        slug,
        sortOrder,
        isActive,
        productCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (cat: AdminCategory) => {
    // Relational Integrity Guard: Reject deletion if linked products exist
    if (cat.productCount > 0) {
      setDeleteWarning(
        `Cannot delete "${cat.name}". There are ${cat.productCount} active products associated with this category. Please reassign products first.`
      );
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Category Hierarchy</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage spare parts taxonomies, navigation sort orders, and parent-child categories.
          </p>
        </div>
        <Button onClick={openCreateModal} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Category
        </Button>
      </div>

      {deleteWarning && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <strong>Relational Safeguard:</strong> {deleteWarning}
          </div>
          <button
            onClick={() => setDeleteWarning(null)}
            className="text-amber-800 hover:text-black font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Hierarchy Type</th>
                <th className="py-3 px-4">Assigned Products</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {categories
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-content-secondary">
                      #{cat.sortOrder}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-content-primary flex items-center gap-1.5">
                        <FolderTree className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{cat.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-content-muted">{cat.slug}</td>
                    <td className="py-3 px-4">
                      {cat.parentId ? (
                        <span className="text-content-secondary">Subcategory</span>
                      ) : (
                        <span className="font-medium text-slate-700">Root Category</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-800 border border-sky-200">
                        {cat.productCount} SKUs
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {cat.isActive ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1 rounded text-content-secondary hover:text-brand-accent hover:bg-sky-50 transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-1 rounded text-content-secondary hover:text-status-error hover:bg-rose-50 transition-colors"
                          title="Delete Category"
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
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create New Category'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-content-primary mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingCategory) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }
              }}
              required
              placeholder="e.g. Mobile Batteries"
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div>
            <label className="block font-medium text-content-primary mb-1">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="e.g. mobile-batteries"
              className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-content-primary mb-1">Parent Category</label>
              <select
                value={parentId || ''}
                onChange={(e) => setParentId(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <option value="">None (Top-Level Root)</option>
                {categories
                  .filter((c) => !editingCategory || c.id !== editingCategory.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-content-primary mb-1">Display Sort Order</label>
              <input
                type="number"
                min="1"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="catActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="catActive" className="text-content-primary font-medium cursor-pointer">
              Category Active in Storefront Navigation & Filters
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
