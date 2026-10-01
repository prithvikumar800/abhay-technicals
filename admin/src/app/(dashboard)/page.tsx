'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  Clock,
  Truck,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Activity,
  Zap,
  BarChart3,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Circle,
} from 'lucide-react';
import { mockKpis, mockOrders, mockProducts, mockShipments, mockAuditLogs } from '../../lib/mock-data';
import { apiClient } from '../../lib/api-client';
import { KpiSummary } from '../../types';

// ── Colour configs for KPI cards (Light Mode) ────────────────────────────────────────────
const kpiCards = (kpis: KpiSummary) => [
  {
    label:   'Total GMV',
    value:   `₹${kpis.totalSales.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`,
    sub:     `Today: ₹${kpis.todayRevenue.toLocaleString('en-IN')}`,
    subIcon: TrendingUp,
    subColor:'text-emerald-700',
    icon:    IndianRupee,
    gradient:'from-emerald-50 via-white to-emerald-50/30',
    ring:    'border border-emerald-200/80 shadow-xs',
    iconBg:  'bg-emerald-100 border border-emerald-200',
    iconColor:'text-emerald-700',
  },
  {
    label:   'Orders Processed',
    value:   String(kpis.totalOrders),
    sub:     `${kpis.pendingOrdersCount} pending fulfillment`,
    subIcon: Clock,
    subColor:'text-amber-700',
    icon:    ShoppingBag,
    gradient:'from-sky-50 via-white to-sky-50/30',
    ring:    'border border-sky-200/80 shadow-xs',
    iconBg:  'bg-sky-100 border border-sky-200',
    iconColor:'text-sky-700',
  },
  {
    label:   'Pending Shipments',
    value:   String(kpis.pendingShipmentsCount),
    sub:     'Delhivery Surface Express',
    subIcon: Truck,
    subColor:'text-violet-700',
    icon:    Truck,
    gradient:'from-violet-50 via-white to-violet-50/30',
    ring:    'border border-violet-200/80 shadow-xs',
    iconBg:  'bg-violet-100 border border-violet-200',
    iconColor:'text-violet-700',
  },
  {
    label:   'Low Stock Alerts',
    value:   `${kpis.lowStockCount} SKUs`,
    sub:     `${kpis.totalProducts} total catalogue items`,
    subIcon: AlertTriangle,
    subColor:'text-rose-700',
    icon:    Package,
    gradient:'from-rose-50 via-white to-rose-50/30',
    ring:    'border border-rose-200/80 shadow-xs',
    iconBg:  'bg-rose-100 border border-rose-200',
    iconColor:'text-rose-700',
  },
];

// ── Status badge helper (Light Mode) ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PAID:       'bg-emerald-50 text-emerald-700 border-emerald-200',
    PENDING:    'bg-amber-50 text-amber-700 border-amber-200',
    PROCESSING: 'bg-sky-50 text-sky-700 border-sky-200',
    RECEIVED:   'bg-violet-50 text-violet-700 border-violet-200',
    MANIFESTED: 'bg-blue-50 text-blue-700 border-blue-200',
    SHIPPED:    'bg-teal-50 text-teal-700 border-teal-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${map[status] ?? 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KpiSummary>(mockKpis);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await apiClient.get<KpiSummary>('/admin/dashboard/stats');
        if (res.data) {
          setKpis(res.data);
          setIsLive(true);
        }
      } catch {
        setIsLive(false);
      }
    }
    loadStats();
  }, []);

  const lowStockItems = mockProducts.filter((p) => p.stockQty <= 10);

  return (
    <div className="space-y-6">

      {/* ══════════════════════════════════════════════════════════
          HERO HEADER BANNER (Light Mode)
      ══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xs p-6 sm:p-8">
        {/* Soft decorative glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-32 rounded-full bg-slate-100/50 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="space-y-2">
            {/* Live / mock badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase ${
                  isLive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isLive ? 'Live API Metrics' : 'Mock Development Fixtures'}
              </span>
              <span className="text-[10px] text-slate-600 font-mono bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                Wholesale: LOGIN_GATED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Executive Dashboard
            </h1>
            <p className="text-sm text-slate-600 max-w-lg">
              Real-time operations, inventory thresholds, and Delhivery logistics overview for{' '}
              <span className="text-brand-accent font-semibold">Abhay Technicals</span>.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold transition-all shadow-sm min-h-[40px]"
            >
              <Package className="w-3.5 h-3.5" />
              Manage Products
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all min-h-[40px]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              View Orders
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          KPI CARDS (Light Mode)
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards(kpis).map(({ label, value, sub, subIcon: SubIcon, subColor, icon: Icon, gradient, ring, iconBg, iconColor }) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${ring} p-5 hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {label}
              </span>
              <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
              </div>
            </div>

            <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>

            <div className={`flex items-center gap-1.5 mt-2 text-xs ${subColor} font-medium`}>
              <SubIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN GRID: Orders table + Sidebar panels
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Recent Orders Table (2 cols) ───────────────────── */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Orders</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest customer and wholesale technician orders</p>
            </div>
            <Link
              href="/orders"
              className="text-xs font-bold text-brand-accent hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  {['Order #', 'Customer', 'Amount', 'Payment', 'Status', ''].map((h) => (
                    <th key={h} className="py-3 px-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-accent text-[11px] whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{order.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-[11px] text-brand-accent hover:underline font-bold inline-flex items-center gap-1"
                      >
                        Details <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Column ──────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Low Stock Watch */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Low-Stock Watch</h2>
              </div>
              <Link
                href="/products?filter=low-stock"
                className="text-[11px] font-bold text-brand-accent hover:text-red-700 transition-colors"
              >
                Reorder →
              </Link>
            </div>

            <div className="space-y-2.5">
              {lowStockItems.length === 0 ? (
                <div className="flex items-center gap-2 text-xs text-emerald-600 py-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  All stock levels healthy
                </div>
              ) : (
                lowStockItems.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {prod.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        {prod.sku}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
                      {prod.stockQty} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Delhivery / Shipping Status */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-brand-accent" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Shipping Status</h3>
              </div>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-lg font-mono">
                Mock Provider
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ready to manifest orders via Delhivery B2B/B2C surface delivery.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Active Manifests</span>
                <span className="font-bold text-slate-900 font-mono">1 Ready</span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Last AWB Created</span>
                <span className="font-mono text-slate-700 text-[10px] font-semibold">DELHIVERY_179…01</span>
              </div>
            </div>

            <Link
              href="/shipments"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              Manage Delhivery Manifests
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM: Quick Stats + Audit Log
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Quick Platform Stats */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-5 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-accent" />
            Platform Snapshot
          </h3>

          {[
            { label: 'Active Customers',   value: String(mockKpis.totalCustomers), color: 'bg-sky-500',     pct: 72 },
            { label: 'Catalogue Products', value: String(mockKpis.totalProducts),  color: 'bg-violet-500',  pct: 85 },
            { label: 'Wholesale Customers',value: '12 shops',                       color: 'bg-emerald-500', pct: 45 },
            { label: 'Avg Order Value',    value: '₹2,003',                         color: 'bg-amber-500',   pct: 60 },
          ].map(({ label, value, color, pct }) => (
            <div key={label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">{label}</span>
                <span className="font-bold text-slate-900">{value}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Audit Activity */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-accent" />
              Recent Activity
            </h3>
            <Link
              href="/audit-logs"
              className="text-[11px] font-bold text-brand-accent hover:text-red-700 transition-colors"
            >
              Full Log →
            </Link>
          </div>

          <div className="space-y-3">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 leading-snug">
                    {log.detailsSummary}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                    <span className="font-mono">{log.actorPhone}</span>
                    <span>·</span>
                    <span className="uppercase tracking-wider font-bold text-slate-600">{log.action}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono shrink-0 mt-0.5 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {/* Placeholder entries for visual richness */}
            {[
              { text: 'Customer Suresh Kumar verified via WhatsApp OTP', time: '07:45' },
              { text: 'New wholesale tier pricing updated for 50+ pcs slab', time: '06:30' },
              { text: 'Product catalogue export generated (CSV)', time: '05:12' },
            ].map(({ text, time }) => (
              <div key={text} className="flex items-start gap-3 opacity-70">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Circle className="w-3 h-3 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-600 leading-snug">{text}</div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono shrink-0 mt-0.5 whitespace-nowrap">
                  {time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
