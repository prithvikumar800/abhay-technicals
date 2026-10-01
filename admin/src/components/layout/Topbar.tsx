'use client';

import React from 'react';
import { useAuth } from '../../lib/auth-context';
import { Bell, Search, LogOut, Menu, User as UserIcon, Cpu } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function Topbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: toggle + breadcrumbs */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumbs />
      </div>

      {/* Right: search + bells + profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="search"
            placeholder="Search SKU, Order..."
            className="w-56 pl-8 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 mx-1" />

        {/* Admin profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
            <UserIcon className="h-4 w-4" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {user?.name || user?.phone || 'Admin Staff'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">
              {user?.role || 'ADMIN'}
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-red-50 transition-colors ml-1"
            title="Log out"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
