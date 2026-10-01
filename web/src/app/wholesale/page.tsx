import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  MessageCircle,
  Truck,
  Layers,
  FileText,
  Clock,
  HelpCircle,
} from 'lucide-react';

export const metadata = {
  title: 'B2B Wholesale Pricing for Mobile Repair Shops',
  description:
    'Unlock verified technician pricing, bulk discounts, and GST tax invoices for smartphone repair workshops across India.',
};

export default function WholesalePage() {
  const tiers = [
    { qty: '5+ Units', discount: '10% – 15% OFF', label: 'Starter Workshop Slab' },
    { qty: '10+ Units', discount: '18% – 25% OFF', label: 'Volume Technician Slab' },
    { qty: '50+ Units', discount: '30% – 40% OFF', label: 'Master Distributor Slab' },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#031538] via-[#072464] to-[#0A3982] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold tracking-wide">
            <Tag className="w-3.5 h-3.5 text-sky-400" />
            <span>TECHNICIAN B2B PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Wholesale Prices <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-white">
              for Mobile Repair Workshops
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Get direct OEM pricing on batteries, screens, charging flex cables, camera glasses, and tools.
            No middlemen, zero hidden fees, and guaranteed compatibility testing.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/register?type=wholesale"
              className="px-6 py-3 bg-[#E52521] hover:bg-[#C61E1A] text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-md"
            >
              <span>Create Technician Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://wa.me/917295096715?text=Hello%20Abhay%20Technicals,%20I%20want%20to%20apply%20for%20a%20B2B%20wholesale%20account."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-md group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Desk</span>
            </Link>
            <Link
              href="/login"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all border border-white/20"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Discount Tiers */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Volume Discount Slabs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tier discounts are applied automatically in your shopping cart when order quantities meet threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-red-400 hover:shadow-md transition-all"
            >
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  {tier.label}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                  {tier.qty}
                </div>
                <div className="text-sm font-bold text-emerald-600 mt-1">
                  {tier.discount}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                Automatic cart calculation · Combined across matching SKUs
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Steps */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How to Unlock Wholesale Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Quick 2-minute verification process for active technicians and repair stores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900">Send Workshop Details</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Send your shop board photo, visiting card, or GSTIN number to our WhatsApp verification desk.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900">Instant Role Activation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our team verifies your workshop in under 15 minutes and updates your account to verified Wholesaler.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900">Order at Wholesale Rates</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Login to the website or Android app. Wholesale rate slabs will automatically display on all product pages.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start gap-3">
          <Truck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs text-slate-900">Air Express Dispatch</h4>
            <p className="text-[11px] text-slate-500 mt-1">Priority packing &amp; dispatch via Delhivery Air.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start gap-3">
          <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs text-slate-900">GST Tax Invoices</h4>
            <p className="text-[11px] text-slate-500 mt-1">Full 18% GST input tax credit (ITC) for your business.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs text-slate-900">7-Day Testing Warranty</h4>
            <p className="text-[11px] text-slate-500 mt-1">Hassle-free replacement on pre-installation defects.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs text-slate-900">Dedicated B2B Desk</h4>
            <p className="text-[11px] text-slate-500 mt-1">Direct priority WhatsApp support from 9 AM to 7 PM.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
