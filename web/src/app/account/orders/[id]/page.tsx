'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Truck, MapPin, CheckCircle, Package } from 'lucide-react';
import { mockOrders } from '../../../../lib/mock-data';

export default function CustomerOrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const order = mockOrders.find((o) => o.id === orderId || o.orderNumber === orderId) || mockOrders[0];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Order History</span>
        </Link>
        <Link
          href="/track-order"
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline"
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Live Tracking Timeline</span>
        </Link>
      </div>

      <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-xs space-y-6 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <h1 className="text-xl font-bold font-mono text-brand-primary">{order.orderNumber}</h1>
            <p className="text-content-muted mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-red-50 text-red-800 border border-red-200">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Delhivery Waybill Banner */}
        <div className="p-4 bg-red-50/80 rounded-xl border border-red-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-brand-primary block">
              Courier Logistics Waybill (AWB):
            </span>
            <span className="font-mono font-bold text-sm text-brand-accent">
              {order.awbCode || 'Generating Manifest...'}
            </span>
            <p className="text-[11px] text-content-secondary mt-0.5">
              Provider: {order.courier || 'Delhivery Surface Express'}
            </p>
          </div>
          <Link
            href="/track-order"
            className="px-4 py-2 bg-brand-primary text-white rounded-lg font-bold text-xs hover:bg-brand-dark self-start sm:self-auto"
          >
            Track Waybill
          </Link>
        </div>

        {/* Line Items */}
        <div className="space-y-3">
          <h3 className="font-bold text-content-primary uppercase tracking-wider text-[11px]">
            Purchased Spare Parts
          </h3>
          <div className="border border-border-subtle rounded-xl overflow-hidden divide-y divide-border-subtle">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-content-primary">{item.productTitle}</h4>
                  <span className="text-[11px] font-mono text-content-muted">SKU: {item.sku}</span>
                  {item.tierApplied && (
                    <div className="mt-1">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.tierApplied}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-content-primary">₹{item.totalPrice.toFixed(2)}</div>
                  <div className="text-[11px] text-content-muted">
                    {item.quantity} pcs @ ₹{item.unitPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Financials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
          <div className="space-y-2">
            <h3 className="font-bold text-content-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              <span>Destination Delivery Address</span>
            </h3>
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle text-content-secondary space-y-0.5">
              <p className="font-semibold text-content-primary">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} —{' '}
                <strong className="font-mono text-content-primary">
                  {order.shippingAddress.pincode}
                </strong>
              </p>
              <p className="font-mono text-content-muted pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-content-primary uppercase tracking-wider text-[11px]">
              Payment Summary
            </h3>
            <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle space-y-1.5">
              <div className="flex justify-between">
                <span className="text-content-secondary">Items Subtotal:</span>
                <span className="font-mono font-medium">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-secondary">Delhivery Shipping:</span>
                <span className="font-mono font-medium">
                  {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-content-primary pt-1 border-t border-border-subtle">
                <span>Grand Total (Paid):</span>
                <span className="font-mono text-sm text-brand-primary">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
