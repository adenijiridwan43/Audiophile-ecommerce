// src/app/providers.tsx - Wrap all providers

'use client';

import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { CartProvider } from '@/store/context/CartContext';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <CartProvider>
        {children}
      </CartProvider>
    </ConvexProvider>
  );
}