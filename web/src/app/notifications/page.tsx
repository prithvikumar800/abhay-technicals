'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ArrowLeft, Clock, Truck, Layers } from 'lucide-react';

export default function NotificationsPage() {
  const alerts = [
    {
      id: 'notif-1',
      title: 'Delhivery Surface Dispatch Manifested',
      desc: 'Order AT-2026-00101 has been assigned AWB DELHIVERY_1790101101 and is packed for dispatch.',
      time: '2 hours ago',
      icon: Truck,
      color: 'text-brand-accent bg-sky-50',
    },
    {
      id: 'notif-2',
      title: 'Wholesale B2B Policy Active',
      desc: 'Your account is authorized to view and purchase at wholesale tier rates.',
      time: '1 day ago',
      icon: Layers,
      color: 'text-emerald-700 bg-emerald-50',
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
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
        <h1 className="text-2xl font-extrabold text-content-primary">Notifications & Alerts</h1>
        <p className="text-xs text-content-secondary mt-0.5">
          Real-time updates regarding order status, shipment milestones, and catalogue arrivals.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((al) => {
          const Icon = al.icon;
          return (
            <div
              key={al.id}
              className="p-4 rounded-2xl bg-surface-card border border-border-subtle shadow-xs flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${al.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-content-primary">{al.title}</h3>
                  <span className="text-[10px] text-content-muted font-mono">{al.time}</span>
                </div>
                <p className="text-content-secondary leading-relaxed">{al.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
