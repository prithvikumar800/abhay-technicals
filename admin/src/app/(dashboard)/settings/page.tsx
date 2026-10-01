'use client';

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Save,
  CheckCircle2,
  Building,
  CreditCard,
  Truck,
  MessageSquare,
  Bell,
  Globe,
  Layers,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('ABHAY TECHNICALS');
  const [supportPhone, setSupportPhone] = useState('+91 73950 96715');
  const [supportEmail, setSupportEmail] = useState('support@abhaytechnicals.com');
  const [wholesalePricingMode, setWholesalePricingMode] = useState<'LOGIN_GATED' | 'PUBLIC_TIERED' | 'REQUEST_ONLY' | 'RETAIL_ONLY'>('LOGIN_GATED');
  const [gstDisplayMode, setGstDisplayMode] = useState<'INCLUSIVE' | 'EXCLUSIVE'>('INCLUSIVE');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(999);
  const [standardFreightCharge, setStandardFreightCharge] = useState<number>(49);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">System & Store Settings</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure global wholesale visibility, GST display modes, logistics thresholds, and integration statuses.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Store Profile */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-2">
            <Building className="w-4 h-4 text-brand-accent" />
            <span>Store Profile & Official Contact</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-content-primary mb-1">Business Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent font-semibold"
              />
            </div>
            <div>
              <label className="block font-medium text-content-primary mb-1">Support WhatsApp Number</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium text-content-primary mb-1">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Commercial Policies & Wholesale Mode */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-2">
            <Layers className="w-4 h-4 text-brand-accent" />
            <span>Commercial Policies & Wholesale Mode</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium text-content-primary mb-1">
                Wholesale Pricing Visibility Strategy
              </label>
              <select
                value={wholesalePricingMode}
                onChange={(e) => setWholesalePricingMode(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-bold text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <option value="LOGIN_GATED">
                  LOGIN_GATED (Wholesale prices only revealed to verified logged-in accounts)
                </option>
                <option value="PUBLIC_TIERED">
                  PUBLIC_TIERED (Transparent tier slabs visible to all visitors)
                </option>
                <option value="REQUEST_ONLY">
                  REQUEST_ONLY (Hide wholesale prices; show &apos;Request B2B Quote&apos; button)
                </option>
                <option value="RETAIL_ONLY">
                  RETAIL_ONLY (Disable volume slabs; standard retail rates for all)
                </option>
              </select>
              <p className="text-[11px] text-content-secondary mt-1">
                Currently locked to <strong>LOGIN_GATED</strong> per Phase 3/4 architectural guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-content-primary mb-1">GST Display Policy</label>
                <select
                  value={gstDisplayMode}
                  onChange={(e) => setGstDisplayMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                  <option value="INCLUSIVE">Inclusive of GST (Recommended for B2C/Technicians)</option>
                  <option value="EXCLUSIVE">Exclusive of GST (+18% added at checkout)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-content-primary mb-1">
                  Free Shipping Min Cart (₹)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div>
                <label className="block font-medium text-content-primary mb-1">
                  Standard Courier Fee (₹)
                </label>
                <input
                  type="number"
                  value={standardFreightCharge}
                  onChange={(e) => setStandardFreightCharge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-surface-subtle border border-border-subtle rounded-lg font-mono text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Integration Statuses (No secret key leakage) */}
        <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h2 className="text-sm font-bold text-content-primary flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Third-Party Integrations Health & Readiness</span>
            </h2>
            <span className="text-[10px] text-content-muted font-mono">Secrets Isolated</span>
          </div>

          <p className="text-xs text-content-secondary">
            Per system security guidelines, actual API secret keys are stored strictly in backend server
            environment variables. Only provider readiness states are displayed here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* WhatsApp */}
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-semibold text-content-primary">WhatsApp OTP Gateway</div>
                  <div className="text-[10px] text-content-muted">Mock Provider Configured</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE (MOCK)
              </span>
            </div>

            {/* Delhivery */}
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-brand-accent" />
                <div>
                  <div className="font-semibold text-content-primary">Delhivery Surface API</div>
                  <div className="text-[10px] text-content-muted">Mock Provider Configured</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                ACTIVE (MOCK)
              </span>
            </div>

            {/* Payment Gateway */}
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="font-semibold text-content-primary">Payment (Razorpay / Cashfree)</div>
                  <div className="text-[10px] text-content-muted">Prepaid Checkout Mode</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                ACTIVE (MOCK)
              </span>
            </div>

            {/* Firebase FCM */}
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="font-semibold text-content-primary">Firebase Cloud Messaging</div>
                  <div className="text-[10px] text-content-muted">Mobile Push Dispatch</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                READY FOR PHASE 8
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            <Save className="w-4 h-4 mr-1.5" />
            Save Store Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
