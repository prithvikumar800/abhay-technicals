import React from 'react';
import Link from 'next/link';
import { Layers, ChevronRight, Smartphone, Zap, Camera, BatteryCharging, Cpu } from 'lucide-react';
import { mockCategories } from '../../lib/mock-data';

export const metadata = {
  title: 'Hardware Component Categories',
  description: 'Browse mobile phone spare parts by sub-system: batteries, charging flex boards, camera glass, displays, and OCA glass.',
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Component Categories</h1>
        <p className="text-xs text-content-secondary mt-1">
          Select a category to view compatible parts for Vivo, Realme, Apple, Oppo, and Xiaomi devices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.slug}`}
            className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-primary flex items-center justify-center font-bold group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
                  {c.name}
                </h3>
                <span className="text-xs font-mono text-content-muted">
                  {c.productCount} components in stock
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-content-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
