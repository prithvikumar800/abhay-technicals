import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-content-primary mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full px-3.5 py-2 text-sm bg-surface-card border rounded-lg transition-colors placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent min-h-[42px]',
            error ? 'border-status-error focus:ring-red-400' : 'border-border-strong',
            className
          )
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-status-error">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-content-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}
