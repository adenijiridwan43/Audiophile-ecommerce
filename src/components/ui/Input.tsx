// src/components/ui/Input.tsx - Form Input Component

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              'block text-xs font-bold mb-2',
              error ? 'text-red-500' : 'text-dark'
            )}
          >
            {label}
            {error && <span className="ml-2 text-red-500">{error}</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-6 py-4 border-2 rounded-lg text-sm font-bold',
            'focus:outline-none focus:border-primary',
            'placeholder:text-dark-gray placeholder:opacity-40',
            error 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-light-gray',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';