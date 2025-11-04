// src/components/ui/QuantitySelector.tsx - +/- Quantity Control

'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QUANTITY_LIMITS } from '@/lib/constants';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  className,
  size = 'md'
}: QuantitySelectorProps) {
  const canDecrease = quantity > QUANTITY_LIMITS.min;
  const canIncrease = quantity < QUANTITY_LIMITS.max;

  return (
    <div 
      className={cn(
        'flex items-center bg-light-gray',
        size === 'sm' ? 'gap-3 px-3 py-2' : 'gap-5 px-4 py-4',
        className
      )}
    >
      <button
        onClick={onDecrease}
        disabled={!canDecrease}
        className={cn(
          'text-dark-gray hover:text-primary transition-colors',
          'disabled:opacity-30 disabled:cursor-not-allowed',
          size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="w-full h-full" strokeWidth={2} />
      </button>

      <span 
        className={cn(
          'font-bold text-dark min-w-[2ch] text-center',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={!canIncrease}
        className={cn(
          'text-dark-gray hover:text-primary transition-colors',
          'disabled:opacity-30 disabled:cursor-not-allowed',
          size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
        )}
        aria-label="Increase quantity"
      >
        <Plus className="w-full h-full" strokeWidth={2} />
      </button>
    </div>
  );
}