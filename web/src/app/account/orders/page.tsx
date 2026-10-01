'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Calendar, Truck, Eye } from 'lucide-react';
import { mockOrders } from '../../../lib/mock-data';

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-content-primary">Order History & Invoices</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          View past purchases, Delhivery waybills, and print packing invoices.
        </p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-surface-card rounded-2xl border border-border-subtle p-5 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle pb-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-mono font-bold text-sm text-brand-primary block">
                  {ord.orderNumber}
                </span>
                <span className="text-[11px] text-content-muted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                  {ord.orderStatus}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {ord.paymentStatus}
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs">
              {ord.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-content-primary">{item.productTitle}</span>
                    <span className="text-[11px] text-content-muted font-mono block">
                      SKU: {item.sku} • {item.quantity} pcs @ ₹{item.unitPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-content-primary">
                    ₹{item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer with Total and Details Link */}
            <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div>
                <span className="text-content-muted">Total Paid (Incl. GST): </span>
                <span className="font-mono font-bold text-base text-content-primary">
                  ₹{ord.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {ord.awbCode && (
                  <Link
                    href={`/track-order`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:underline"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track AWB</span>
                  </Link>
                )}
                <Link
                  href={`/account/orders/${ord.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-slate-200 text-content-primary font-bold text-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Order Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
