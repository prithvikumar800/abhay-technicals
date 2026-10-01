import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Wrench, Layers, Phone } from 'lucide-react';
import { WhatsAppCTA } from '../../components/common/WhatsAppCTA';

export const metadata = {
  title: 'About Abhay Technicals — Mobile Spare Parts & Workshop Solutions',
  description: 'Learn about Abhay Technicals, a specialized supplier of precision smartphone spare parts, batteries, and tools for mobile technicians across India.',
};

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-6">
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider">
          WHO WE ARE
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-content-primary">
          Engineered for Smartphone Repair Technicians
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
          Abhay Technicals is a dedicated wholesale distributor of smartphone replacement hardware,
          mobile batteries, sub-board charging flexes, camera glasses, and OCA touch panels. We bridge
          the gap between factory OEM testing standards and independent mobile repair workshop owners
          across India.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-brand-accent flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-content-primary">Workshop Focus</h3>
          <p className="text-content-secondary leading-relaxed">
            We understand that a technician&apos;s reputation depends on the quality of the replacement
            component. That is why every SKU in our catalogue undergoes pre-dispatch voltage, pinout,
            and dimension validation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-content-primary">Transparent Wholesale Slabs</h3>
          <p className="text-content-secondary leading-relaxed">
            Repair shops ordering 5+, 10+, or 50+ units receive automatic volume discounts without
            requiring cumbersome dealership paperwork or delayed manual quotation emails.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-bold text-base sm:text-lg">Have a Bulk Procurement Requirement?</h3>
          <p className="text-xs text-slate-300">
            Connect directly with our logistics and technical support desk on WhatsApp.
          </p>
        </div>
        <WhatsAppCTA
          presetText="Hello Abhay Technicals team, I would like to enquire about wholesale supplies for my repair shop."
          className="shrink-0"
        />
      </div>
    </div>
  );
}
