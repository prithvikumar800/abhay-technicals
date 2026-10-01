'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  Smartphone,
  Layers2,
  ShoppingCart,
  Truck,
  Users,
  Star,
  FileText,
  Settings,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  badgeVariant?: 'warning' | 'info';
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    groupName: 'Operations',
    items: [
      { label: 'Dashboard',  href: '/',          icon: LayoutDashboard },
      { label: 'Orders',     href: '/orders',    icon: ShoppingCart, badge: 9,  badgeVariant: 'warning' },
      { label: 'Shipments',  href: '/shipments', icon: Truck,        badge: 14, badgeVariant: 'info'    },
    ],
  },
  {
    groupName: 'Catalogue',
    items: [
      { label: 'Products',        href: '/products',   icon: Package  },
      { label: 'Categories',      href: '/categories', icon: Layers   },
      { label: 'Brands',          href: '/brands',     icon: Tag      },
      { label: 'Device Models',   href: '/models',     icon: Smartphone },
      { label: 'Wholesale Tiers', href: '/wholesale',  icon: Layers2  },
    ],
  },
  {
    groupName: 'Customers & Content',
    items: [
      { label: 'Customers', href: '/customers', icon: Users     },
      { label: 'Reviews',   href: '/reviews',   icon: Star      },
      { label: 'CMS & Blog',href: '/cms',       icon: FileText  },
    ],
  },
  {
    groupName: 'System',
    items: [
      { label: 'Settings',   href: '/settings',    icon: Settings    },
      { label: 'Audit Logs', href: '/audit-logs',  icon: ShieldAlert },
    ],
  },
];

export function Sidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={twMerge(
        clsx(
          'h-screen sticky top-0 flex flex-col transition-all duration-300 z-30 select-none',
          'bg-white border-r border-slate-200 shadow-xs',
          isCollapsed ? 'w-[70px]' : 'w-64'
        )
      )}
    >
      {/* ── Brand Header ──────────────────────────────────── */}
      <div
        className={clsx(
          'h-16 flex items-center border-b border-slate-200 shrink-0 bg-white',
          isCollapsed ? 'justify-center px-3' : 'px-4 gap-3'
        )}
      >
        <div className="w-9 h-9 rounded-full bg-slate-50 p-0.5 shadow-sm ring-2 ring-brand-accent/30 flex items-center justify-center shrink-0 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Abhay Technicals"
            className="w-full h-full object-contain"
          />
        </div>

        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-none whitespace-nowrap">
              ABHAY{' '}
              <span className="text-brand-accent">TECHNICALS</span>
            </h1>
            <span className="text-[10px] text-brand-accent font-mono tracking-widest uppercase font-semibold">
              Admin Portal
            </span>
          </div>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
        {navGroups.map((group, gi) => (
          <div key={group.groupName}>
            {/* Group Label */}
            {!isCollapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {group.groupName}
              </p>
            )}
            {isCollapsed && gi > 0 && (
              <div className="my-3 mx-2 h-px bg-slate-200" />
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={twMerge(
                      clsx(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group relative overflow-hidden',
                        isActive
                          ? 'bg-brand-accent text-white shadow-sm font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )
                    )}
                  >
                    {/* Active glow bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-white/70" />
                    )}

                    <Icon
                      className={clsx(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-slate-700'
                      )}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span
                        className={clsx(
                          'text-[10px] px-1.5 py-0.5 rounded-full font-black shrink-0',
                          item.badgeVariant === 'warning'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-sky-100 text-sky-800 border border-sky-200'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && isActive && (
                      <ChevronRight className="w-3 h-3 text-white/80 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer / Version ──────────────────────────────── */}
      <div
        className={clsx(
          'p-3 border-t border-slate-200 bg-slate-50/50 shrink-0',
          isCollapsed ? 'text-center' : ''
        )}
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-2 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] text-slate-500 font-mono">
              v1.0.0 · Node 20 LTS
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-slate-500 font-mono">v1</span>
        )}
      </div>
    </aside>
  );
}
