// src/app/providers.tsx - Wrap all providers

'use client';

import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { CartProvider } from '@/store/context/CartContext';

// Lazy singleton — only created once, only when the URL is available
let convexClient: ConvexReactClient | null = null;
function getConvexClient(): ConvexReactClient | null {
  if (convexClient) return convexClient;

  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null; // gracefully skip during SSG prerendering

  convexClient = new ConvexReactClient(url);
  return convexClient;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const client = getConvexClient();

  // During SSG prerendering the Convex URL is not available.
  // Render children without Convex — static pages don't need it.
  if (!client) {
    return <CartProvider>{children}</CartProvider>;
  }

  return (
    <ConvexProvider client={client}>
      <CartProvider>
        {children}
      </CartProvider>
    </ConvexProvider>
  );
}
