'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  Truck,
  IndianRupee,
  ExternalLink,
} from 'lucide-react';
import { mockOrders } from '../../../lib/mock-data';
import { AdminOrder } from '../../../types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm) ||
      (o.awbCode && o.awbCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Order Management</h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Monitor incoming customer & wholesale repair technician orders and fulfillment workflows.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Order #, Customer, Phone, AWB..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="RECEIVED">Received</option>
            <option value="PROCESSING">Processing</option>
            <option value="MANIFESTED">Manifested</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Payment Filter */}
        <div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-surface-subtle border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border-subtle text-content-secondary font-medium uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items / SKUs</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4">Delhivery AWB</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-content-muted">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order Number & Date */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-brand-primary">
                        {order.orderNumber}
                      </div>
                      <div className="text-[11px] text-content-muted flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-content-primary">{order.customerName}</div>
                      <div className="text-[11px] font-mono text-content-secondary">
                        {order.customerPhone}
                      </div>
                      {order.shippingAddress.city && (
                        <div className="text-[10px] text-content-muted">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </div>
                      )}
                    </td>

                    {/* Line Items */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-content-primary">
                        {order.items.length} SKU{order.items.length > 1 ? 's' : ''} (
                        {order.items.reduce((acc, i) => acc + i.quantity, 0)} pcs)
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3 px-4 font-mono font-bold text-content-primary">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          order.paymentStatus === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.paymentStatus === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Order Fulfillment Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          order.orderStatus === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.orderStatus === 'PROCESSING' || order.orderStatus === 'MANIFESTED'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Delhivery AWB */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {order.awbCode ? (
                        <span className="inline-flex items-center gap-1 text-brand-accent font-medium">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{order.awbCode}</span>
                        </span>
                      ) : (
                        <span className="text-content-muted">Unmanifested</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-subtle hover:bg-slate-200 text-content-primary font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
