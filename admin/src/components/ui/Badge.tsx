import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';
  size?: 'sm' | 'md';
}

export function Badge({ children, className, variant = 'neutral', size = 'md', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    success: 'bg-status-success-bg text-status-success border border-green-200',
    warning: 'bg-status-warning-bg text-status-warning border border-amber-200',
    error: 'bg-status-error-bg text-status-error border border-red-200',
    info: 'bg-status-info-bg text-status-info border border-blue-200',
    neutral: 'bg-surface-subtle text-content-secondary border border-border-subtle',
    brand: 'bg-brand-accent-bg text-brand-accent border border-red-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {children}
    </span>
  );
}
