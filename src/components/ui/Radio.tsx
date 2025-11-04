// src/components/ui/Radio.tsx - Radio button group component

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RadioGroup({ label, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className={cn(
          'block text-xs font-bold mb-2',
          error ? 'text-red-500' : 'text-dark'
        )}>
          {label}
          {error && <span className="ml-2 text-red-500">{error}</span>}
        </label>
      </div>
      <div className="space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center gap-4 px-6 py-4 border-2 rounded-lg cursor-pointer transition-colors',
              value === option.value
                ? 'border-primary'
                : 'border-light-gray hover:border-primary'
            )}
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-primary focus:ring-primary"
            />
            <span className="text-sm font-bold">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}