import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-content-primary">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 bg-surface-subtle border rounded-lg text-sm text-content-primary placeholder:text-content-muted transition-all focus:outline-none focus:ring-2 min-h-[44px]',
              error
                ? 'border-status-error focus:ring-red-200'
                : 'border-border-subtle focus:border-brand-accent focus:ring-red-100 bg-surface-card',
              className
            )
          )}
          {...props}
        />
        {error && <p className="text-[11px] text-status-error font-medium">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-content-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
