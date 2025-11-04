// src/components/ui/Button.tsx - Reusable Button Component

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Variants
        {
          // Primary (Orange)
          'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
          
          // Secondary (Black)
          'bg-dark text-white hover:bg-[#4C4C4C]': variant === 'secondary',
          
          // Outline (Transparent with border)
          'border-2 border-dark text-dark bg-transparent hover:bg-dark hover:text-white': 
            variant === 'outline',
          
          // Text (No background)
          'text-dark hover:text-primary bg-transparent': variant === 'text',
        },
        
        // Sizes
        {
          'text-xs px-6 py-2': size === 'sm',
          'text-sm px-8 py-4': size === 'md',
          'text-sm px-10 py-5': size === 'lg',
        },
        
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}