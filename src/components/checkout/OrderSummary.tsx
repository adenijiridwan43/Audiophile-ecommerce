// src/components/checkout/OrderSummary.tsx - Checkout order summary sidebar

'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/store/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice, shortenProductName } from '@/lib/utils';

export function OrderSummary() {
  const { items, totals } = useCart();

  return (
    <div className="bg-white rounded-lg p-8 sticky top-24">
      <h2 className="text-lg font-bold uppercase mb-8">Summary</h2>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Product Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-light-gray shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">
                {shortenProductName(item.name)}
              </h3>
              <p className="text-dark-gray text-sm font-bold">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Quantity */}
            <div className="text-dark-gray text-sm font-bold">
              x{item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-dark-gray uppercase text-sm">Total</span>
          <span className="font-bold">{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-dark-gray uppercase text-sm">Shipping</span>
          <span className="font-bold">{formatPrice(totals.shipping)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-dark-gray uppercase text-sm">VAT (Included)</span>
          <span className="font-bold">{formatPrice(totals.vat)}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-dark-gray uppercase text-sm">Grand Total</span>
        <span className="font-bold text-primary text-lg">
          {formatPrice(totals.grandTotal)}
        </span>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Continue & Pay
      </Button>
    </div>
  );
}