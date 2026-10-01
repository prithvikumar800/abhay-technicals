import React from 'react';
import Link from 'next/link';
import { Tag, ChevronRight } from 'lucide-react';
import { mockBrands } from '../../lib/mock-data';

export const metadata = {
  title: 'Supported Mobile Brands Directory',
  description: 'Shop genuine-fit replacement parts for Vivo, Realme, Apple iPhone, Oppo, Xiaomi, and Samsung devices.',
};

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Manufacturer Brands</h1>
        <p className="text-xs text-content-secondary mt-1">
          Select your customer&apos;s device brand to inspect available batteries, charging flexes, and camera lenses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBrands.map((b) => (
          <Link
            key={b.id}
            href={`/shop?brand=${b.slug}`}
            className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 rounded-xl bg-white border border-slate-200 group-hover:border-red-500 flex items-center justify-center p-2 transition-colors shrink-0 shadow-xs">
                {b.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={b.logoUrl}
                    alt={`${b.name} logo`}
                    className="max-h-7 max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <span className="font-bold text-sm text-slate-700">{b.name[0]}</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
                  {b.name}
                </h3>
                <span className="text-xs font-mono text-content-muted">
                  {b.modelCount} registered handset models
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
