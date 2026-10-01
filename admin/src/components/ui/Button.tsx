import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg';

  const variants = {
    primary: 'bg-brand-primary text-content-inverse hover:bg-brand-primary-hover focus:ring-brand-accent shadow-sm',
    secondary: 'bg-surface-subtle text-content-primary hover:bg-surface-muted border border-border-subtle focus:ring-brand-accent',
    outline: 'border border-border-strong bg-transparent text-content-primary hover:bg-surface-subtle focus:ring-brand-accent',
    ghost: 'bg-transparent text-content-primary hover:bg-surface-subtle focus:ring-brand-accent',
    destructive: 'bg-status-error text-content-inverse hover:bg-red-700 focus:ring-red-500 shadow-sm',
    whatsapp: 'bg-brand-whatsapp text-content-inverse hover:bg-brand-whatsapp-hover focus:ring-green-400 shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2 min-h-[42px]',
    lg: 'text-base px-6 py-2.5 min-h-[48px]',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
