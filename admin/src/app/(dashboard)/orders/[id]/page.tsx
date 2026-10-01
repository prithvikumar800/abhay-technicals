'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  FileText,
  ShieldAlert,
  Printer,
  ExternalLink,
} from 'lucide-react';
import { mockOrders } from '../../../../lib/mock-data';
import { AdminOrder } from '../../../../types';
import { Button } from '../../../../components/ui/Button';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const foundOrder = mockOrders.find((o) => o.id === orderId) || mockOrders[0];
  const [order, setOrder] = useState<AdminOrder>(foundOrder);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUpdateStatus = (newStatus: AdminOrder['orderStatus']) => {
    setOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    setStatusMessage(`Order status updated to ${newStatus}.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders List</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="hidden sm:inline-flex"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            Print Packing Slip
          </Button>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-surface-card p-6 rounded-xl border border-border-subtle shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono text-brand-primary">{order.orderNumber}</h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                order.orderStatus === 'DELIVERED'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
          <p className="text-xs text-content-secondary mt-1">
            Placed on {new Date(order.createdAt).toLocaleString('en-IN')} via WhatsApp Verified Checkout
          </p>
        </div>

        {/* Status Transition Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-content-secondary font-medium">Update Status:</span>
          <select
            value={order.orderStatus}
            onChange={(e) => handleUpdateStatus(e.target.value as AdminOrder['orderStatus'])}
            className="py-1.5 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg font-semibold text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option value="RECEIVED">RECEIVED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="MANIFESTED">MANIFESTED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Strict Historical Pricing Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-content-secondary">
        <ShieldAlert className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
        <div>
          <strong className="text-content-primary">Historical Pricing Immutability:</strong> The unit
          prices, wholesale volume tiers, and GST calculations displayed below reflect the immutable
          snapshot recorded at the instant of order placement. Historical line pricing is permanently
          locked to preserve legal accounting accuracy.
        </div>
      </div>

      {/* Main Grid: Line Items & Customer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Line Items (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border-subtle">
              <h2 className="text-sm font-bold text-content-primary flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-accent" />
                <span>Purchased Line Items ({order.items.length})</span>
              </h2>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle text-content-secondary font-medium uppercase tracking-wider border-b border-border-subtle">
                <tr>
                  <th className="py-2.5 px-4">Item & SKU</th>
                  <th className="py-2.5 px-4">Qty</th>
                  <th className="py-2.5 px-4">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-content-primary">{item.productTitle}</div>
                      <div className="text-[11px] font-mono text-content-muted mt-0.5">
                        SKU: <span className="text-brand-accent font-medium">{item.sku}</span>
                      </div>
                      {item.tierApplied && (
                        <div className="mt-1">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {item.tierApplied}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-content-primary">
                      {item.quantity} pcs
                    </td>
                    <td className="py-3 px-4 font-mono text-content-secondary">
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-content-primary text-right">
                      ₹{item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Summary Breakdown */}
            <div className="p-4 bg-surface-subtle border-t border-border-subtle space-y-2 text-xs">
              <div className="flex justify-between text-content-secondary">
                <span>Items Subtotal</span>
                <span className="font-mono">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-content-secondary">
                <span>Shipping & Freight (Delhivery Surface)</span>
                <span className="font-mono">
                  {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-content-primary pt-2 border-t border-border-subtle">
                <span>Grand Total (Incl. GST)</span>
                <span className="font-mono text-brand-primary">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delhivery Logistics Manifest Card */}
          <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-accent" />
              <span>Delhivery Shipping & Fulfillment</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs bg-surface-subtle p-3.5 rounded-lg border border-border-subtle">
              <div>
                <span className="text-content-muted">Assigned Waybill (AWB):</span>
                <p className="font-mono font-bold text-brand-accent mt-0.5">
                  {order.awbCode || 'Pending Manifest Generation'}
                </p>
              </div>
              <div>
                <span className="text-content-muted">Shipment Status:</span>
                <p className="font-semibold text-content-primary mt-0.5">
                  {order.shipmentStatus || 'Unmanifested'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/shipments"
                className="text-xs font-semibold text-brand-accent hover:underline inline-flex items-center gap-1"
              >
                <span>Manage Delhivery Manifest Dispatch</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Customer & Address Information (1 col) */}
        <div className="space-y-6">
          {/* Customer Profile Card */}
          <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs p-5 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-content-primary border-b border-border-subtle pb-2">
              Customer & Wholesale Profile
            </h3>
            <div>
              <span className="text-content-muted">Customer Name:</span>
              <p className="font-semibold text-content-primary mt-0.5">{order.customerName}</p>
            </div>
            <div>
              <span className="text-content-muted">Mobile Number (WhatsApp):</span>
              <p className="font-mono text-content-primary mt-0.5">{order.customerPhone}</p>
            </div>
            {order.shippingAddress.gstin && (
              <div>
                <span className="text-content-muted">B2B GSTIN (Technician):</span>
                <p className="font-mono font-bold text-brand-accent mt-0.5">
                  {order.shippingAddress.gstin}
                </p>
              </div>
            )}
            <div>
              <span className="text-content-muted">Payment Verification:</span>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {order.paymentStatus} (Online Prepaid)
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs p-5 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-content-primary flex items-center gap-2 border-b border-border-subtle pb-2">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Destination Address</span>
            </h3>
            <div className="text-content-secondary space-y-1">
              <p className="font-semibold text-content-primary">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} —{' '}
                <span className="font-mono font-bold text-content-primary">
                  {order.shippingAddress.pincode}
                </span>
              </p>
              <p className="font-mono text-content-muted mt-2">Contact: {order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
