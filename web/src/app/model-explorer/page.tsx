import React from 'react';
import { ModelExplorer } from '../../components/home/ModelExplorer';
import { Smartphone, CheckCircle, ShieldCheck, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Handset Model Explorer — Precision Part Finder',
  description: 'Filter spare parts by selecting Brand -> Device Model -> Compatible Spare Parts. Guaranteed fit without rework.',
};

export default function ModelExplorerPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
          Handset Model Explorer & Part Finder
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto">
          Avoid costly incorrect parts orders. Our Model Explorer links verified component pinouts to
          specific OEM device revisions.
        </p>
      </div>

      <ModelExplorer />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border-subtle text-xs">
        <div className="p-4 bg-surface-card rounded-xl border border-border-subtle space-y-1">
          <div className="font-bold text-content-primary flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Pinout Accuracy</span>
          </div>
          <p className="text-content-secondary text-[11px]">
            Every charging flex and battery connector matches the exact motherboard logic pinout.
          </p>
        </div>

        <div className="p-4 bg-surface-card rounded-xl border border-border-subtle space-y-1">
          <div className="font-bold text-content-primary flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>Physical Frame Tolerances</span>
          </div>
          <p className="text-content-secondary text-[11px]">
            Displays and rear camera glasses match chassis millimeter specifications precisely.
          </p>
        </div>

        <div className="p-4 bg-surface-card rounded-xl border border-border-subtle space-y-1">
          <div className="font-bold text-content-primary flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-purple-600" />
            <span>Fast Workshop Turnaround</span>
          </div>
          <p className="text-content-secondary text-[11px]">
            Repair technicians fix customer handsets on the first try without board rework.
          </p>
        </div>
      </div>
    </div>
  );
}
