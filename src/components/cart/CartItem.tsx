// src/components/cart/CartItem.tsx - Individual Cart Item

'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/store/context/CartContext';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { CartItem as CartItemType } from '@/types';
import { formatPrice, shortenProductName } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
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

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={item.quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        size="sm"
      />
    </div>
  );
}