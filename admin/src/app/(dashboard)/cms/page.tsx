'use client';

import React, { useState } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Globe,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface CmsItem {
  id: string;
  type: 'BANNER' | 'PAGE' | 'BLOG';
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  metaDescription: string;
  updatedAt: string;
}

const mockCmsItems: CmsItem[] = [
  {
    id: 'cms-1',
    type: 'BANNER',
    title: 'Festival Season Wholesale Discount Banner (Batteries & Flex)',
    slug: 'hero-banner-wholesale-sept-2026',
    status: 'PUBLISHED',
    metaDescription: 'Wholesale spare parts festival sale banner for technician accounts.',
    updatedAt: '2026-09-24',
  },
  {
    id: 'cms-2',
    type: 'PAGE',
    title: 'Replacement & Return Policy (7-Day Testing Warranty)',
    slug: 'return-policy',
    status: 'PUBLISHED',
    metaDescription: 'Strict testing warranty policy for displays, batteries and charging IC boards.',
    updatedAt: '2026-09-20',
  },
  {
    id: 'cms-3',
    type: 'BLOG',
    title: 'Complete Guide: Diagnosing Vivo & Realme Charging Flex Failures',
    slug: 'diagnosing-charging-flex-failures',
    status: 'DRAFT',
    metaDescription: 'Technical troubleshooting walkthrough for mobile technicians on CC boards.',
    updatedAt: '2026-09-25',
  },
];

export default function CmsPage() {
  const [items, setItems] = useState<CmsItem[]>(mockCmsItems);
  const [activeTab, setActiveTab] = useState<'ALL' | 'BANNER' | 'PAGE' | 'BLOG'>('ALL');

  const filtered = items.filter((i) => (activeTab === 'ALL' ? true : i.type === activeTab));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Content & CMS Management</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage promotional banners, legal policies, repair guides, and SEO metadata.
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Create New Content
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3 text-xs">
        {[
          { key: 'ALL', label: 'All Content' },
          { key: 'BANNER', label: 'Homepage Banners' },
          { key: 'PAGE', label: 'Static CMS Pages' },
          { key: 'BLOG', label: 'Technical Blogs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-brand-accent text-white font-semibold'
                : 'bg-surface-subtle text-content-secondary hover:text-content-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Content Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4">SEO Summary</th>
              <th className="py-3 px-4">Publication Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-content-primary">{item.title}</div>
                  <div className="text-[11px] text-content-muted mt-0.5">Updated: {item.updatedAt}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {item.type}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-brand-accent font-medium">/{item.slug}</td>
                <td className="py-3 px-4 text-content-secondary max-w-xs truncate">
                  {item.metaDescription}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'SCHEDULED'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button className="text-xs text-brand-accent hover:underline font-medium">
                      Edit
                    </button>
                    <button className="text-xs text-status-error hover:underline font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
