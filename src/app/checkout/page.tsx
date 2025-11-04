// src/app/checkout/page.tsx - Checkout page

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/context/CartContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <main className="bg-very-light-gray min-h-screen">
      <CheckoutForm />
    </main>
  );
}