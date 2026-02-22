// src/app/providers.tsx - Wrap all providers

'use client';

import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { CartProvider } from '@/store/context/CartContext';

// Lazy-initialize to avoid crashing during SSG prerendering
let convexClient: ConvexReactClient | null = null;
function getConvexClient() {
  if (!convexClient) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error(
        'NEXT_PUBLIC_CONVEX_URL is not set. ' +
        'Add it to .env.local locally or to your Vercel environment variables.'
      );
    }
    convexClient = new ConvexReactClient(url);
  }
  return convexClient;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={getConvexClient()}>
      <CartProvider>
        {children}
      </CartProvider>
    </ConvexProvider>
  );
}
