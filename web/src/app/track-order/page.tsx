'use client';

import React, { useState } from 'react';
import {
  Truck,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Calendar,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { mockOrders } from '../../lib/mock-data';
import { CustomerOrder } from '../../types';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('AT-2026-00101');
  const [searchedOrder, setSearchedOrder] = useState<CustomerOrder | null>(mockOrders[0]);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const clean = query.trim().toUpperCase();
    const found = mockOrders.find(
      (o) => o.orderNumber.toUpperCase() === clean || (o.awbCode && o.awbCode.toUpperCase() === clean)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const steps = [
    { key: 'RECEIVED', label: 'Order Received', desc: 'Order placed & payment verified' },
    { key: 'PROCESSING', label: 'Workshop Processing', desc: 'Components packed & bubble cushioned' },
    { key: 'MANIFESTED', label: 'Manifested with Delhivery', desc: 'Waybill generated; awaiting courier pickup' },
    { key: 'SHIPPED', label: 'In Transit', desc: 'Moving through Delhivery surface line-haul hub' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Courier van dispatched to destination address' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Safely handed over to workshop contact' },
  ];

  const getCurrentStepIndex = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 0;
      case 'PROCESSING':
        return 1;
      case 'MANIFESTED':
        return 2;
      case 'SHIPPED':
        return 3;
      case 'OUT_FOR_DELIVERY':
        return 4;
      case 'DELIVERED':
        return 5;
      default:
        return 2;
    }
  };

  const currentIdx = searchedOrder ? getCurrentStepIndex(searchedOrder.orderStatus) : 2;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-brand-primary mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-content-primary">
          Track Your Delhivery Dispatch
        </h1>
        <p className="text-xs text-content-secondary max-w-md mx-auto">
          Enter your Abhay Technicals Order Number or 10-digit Delhivery Waybill (AWB) code to inspect
          live parcel transit milestones.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. AT-2026-00101 or DELHIVERY_..."
            className="w-full px-4 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-xs sm:text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-brand-accent min-h-[44px]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold rounded-xl transition-all min-h-[44px]"
        >
          Track
        </button>
      </form>

      {notFound && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-center">
          No dispatch record found for &ldquo;{query}&rdquo;. Please verify your order number in your confirmation message.
        </div>
      )}

      {searchedOrder && (
        <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-xs space-y-8">
          {/* Order Snapshot Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-6 text-xs">
            <div>
              <span className="text-content-muted">Order Number:</span>
              <p className="text-base font-bold font-mono text-brand-primary">
                {searchedOrder.orderNumber}
              </p>
              <p className="text-[11px] text-content-muted mt-0.5">
                Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-content-muted">Delhivery Waybill (AWB):</span>
              <p className="font-mono font-bold text-brand-accent text-sm">
                {searchedOrder.awbCode || 'Generating Manifest...'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-800 border border-red-200">
                Courier: {searchedOrder.courier || 'Delhivery Surface Express'}
              </span>
            </div>
          </div>

          {/* 6-Step Transit Milestone Timeline */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">
              Transit Progress
            </h3>

            <div className="relative pl-6 space-y-8 border-l-2 border-slate-200 ml-3 text-xs">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="relative group">
                    {/* Step Indicator Dot */}
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 transition-all ${
                        isCurrent
                          ? 'bg-brand-primary border-white ring-4 ring-red-100'
                          : isPassed
                          ? 'bg-emerald-500 border-white'
                          : 'bg-slate-200 border-white'
                      }`}
                    />

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${
                            isCurrent
                              ? 'text-brand-accent text-sm'
                              : isPassed
                              ? 'text-content-primary'
                              : 'text-content-muted'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-red-100 text-brand-primary">
                            Current Status
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-content-secondary">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Destination Snapshot */}
          <div className="p-4 bg-surface-subtle rounded-xl border border-border-subtle text-xs space-y-2">
            <div className="font-bold text-content-primary flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Destination: {searchedOrder.shippingAddress.name}</span>
            </div>
            <p className="text-content-secondary">
              {searchedOrder.shippingAddress.addressLine1}, {searchedOrder.shippingAddress.city},{' '}
              {searchedOrder.shippingAddress.state} —{' '}
              <strong className="font-mono text-content-primary font-bold">
                {searchedOrder.shippingAddress.pincode}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
