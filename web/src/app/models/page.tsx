import React from 'react';
import Link from 'next/link';
import { Smartphone, ChevronRight } from 'lucide-react';
import { mockModels } from '../../lib/mock-data';

export const metadata = {
  title: 'Device Models Directory',
  description: 'Select your mobile handset model to view exact-fit compatible batteries, charging flex boards, and accessories.',
};

export default function DeviceModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Device Model Directory</h1>
        <p className="text-xs text-content-secondary mt-1">
          Select your mobile model to filter replacement parts engineered for exact dimension and pinout fit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockModels.map((m) => (
          <Link
            key={m.id}
            href={`/shop?model=${m.slug}`}
            className="p-5 rounded-2xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-primary flex items-center justify-center font-bold group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-content-primary group-hover:text-brand-accent transition-colors">
                  {m.name}
                </h3>
                <span className="text-[11px] font-mono text-content-muted">
                  {m.brandName} • {m.productCount} compatible parts
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
