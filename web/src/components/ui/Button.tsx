import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'whatsapp' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] min-h-[44px]';

    const variants = {
      primary:
        'bg-brand-primary text-white hover:bg-brand-primary-hover focus-visible:ring-red-400 shadow-sm font-semibold',
      whatsapp:
        'bg-brand-whatsapp text-white hover:bg-brand-whatsapp-dark focus-visible:ring-emerald-400 shadow-sm font-semibold',
      secondary:
        'bg-brand-dark text-white hover:bg-black focus-visible:ring-gray-400 shadow-sm font-medium',
      outline:
        'border border-border-base bg-surface-card text-content-primary hover:bg-surface-subtle hover:border-brand-primary focus-visible:ring-brand-accent',
      ghost:
        'text-content-secondary hover:bg-red-50 hover:text-brand-primary focus-visible:ring-brand-accent',
      destructive:
        'bg-status-error text-white hover:bg-red-700 focus-visible:ring-red-400 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[38px]',
      md: 'text-sm px-4 py-2 min-h-[44px]',
      lg: 'text-base px-6 py-3 min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
