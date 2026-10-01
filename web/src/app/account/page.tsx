'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Bell,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Layers,
  Phone,
  Building,
} from 'lucide-react';
import { useAuth } from '../../providers/auth-provider';
import { mockOrders } from '../../lib/mock-data';

export default function AccountPage() {
  const { user, isWholesaleAuthorized, logout } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Overview Card */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-brand-primary flex items-center justify-center font-bold text-xl shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-content-primary">
                {user?.name || user?.phone || 'Customer Account'}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-brand-primary border border-red-200">
                {user?.role || 'CUSTOMER'}
              </span>
            </div>
            <p className="text-xs font-mono text-content-muted mt-0.5">{user?.phone || '+91 98765 43210'}</p>
            {user?.businessName && (
              <p className="text-xs text-content-secondary mt-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-content-muted" />
                <span>{user.businessName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Wholesale Status Chip */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Wholesale Slabs Unlocked</span>
          </div>
          <p className="text-[11px] text-emerald-700">
            You are authorized for tiered wholesale rates across all spare parts.
          </p>
        </div>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <Link
          href="/account/orders"
          className="p-5 rounded-xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-brand-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
              My Orders
            </h3>
            <p className="text-content-secondary text-[11px]">
              Track active dispatches & invoices
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-brand-accent font-semibold text-[11px]">
            <span>View Orders ({mockOrders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="p-5 rounded-xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
              Saved Addresses
            </h3>
            <p className="text-content-secondary text-[11px]">
              Manage workshop & shop locations
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-brand-accent font-semibold text-[11px]">
            <span>Manage 1 Address</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-5 rounded-xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
              Saved Wishlist
            </h3>
            <p className="text-content-secondary text-[11px]">
              Parts marked for upcoming repairs
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-brand-accent font-semibold text-[11px]">
            <span>View Wishlist</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/notifications"
          className="p-5 rounded-xl bg-surface-card border border-border-subtle hover:border-brand-accent hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-content-primary group-hover:text-brand-accent transition-colors">
              Alerts
            </h3>
            <p className="text-content-secondary text-[11px]">
              Order milestones & stock arrivals
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-brand-accent font-semibold text-[11px]">
            <span>View Alerts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h2 className="text-sm font-bold text-content-primary">Recent Orders</h2>
          <Link href="/account/orders" className="text-xs text-brand-accent hover:underline font-semibold">
            All Orders &rarr;
          </Link>
        </div>

        <div className="divide-y divide-border-subtle">
          {mockOrders.map((ord) => (
            <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-brand-primary block">{ord.orderNumber}</span>
                <span className="text-[11px] text-content-muted">
                  {new Date(ord.createdAt).toLocaleDateString('en-IN')} • {ord.items.length} items
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-content-primary">
                  ₹{ord.totalAmount.toFixed(2)}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                  {ord.orderStatus}
                </span>
                <Link
                  href={`/account/orders/${ord.id}`}
                  className="text-xs font-semibold text-brand-accent hover:underline"
                >
                  Track
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Account</span>
        </button>
      </div>
    </div>
  );
}
