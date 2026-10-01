'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-xs text-content-secondary" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-brand-accent transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5 text-content-muted" />
        <span className="hidden sm:inline">Admin</span>
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const formatted = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <React.Fragment key={path}>
            <ChevronRight className="h-3 w-3 text-content-muted shrink-0" />
            {isLast ? (
              <span className="font-semibold text-content-primary truncate max-w-[150px]">{formatted}</span>
            ) : (
              <Link href={path} className="hover:text-brand-accent transition-colors truncate max-w-[120px]">
                {formatted}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
