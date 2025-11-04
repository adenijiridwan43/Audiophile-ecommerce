// src/components/cart/CartModal.tsx - Shopping Cart Modal

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/context/CartContext';
import { useUIStore } from '@/store/zustand/useUIStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CartItem } from './CartItem';
import { formatPrice } from '@/lib/utils';

export function CartModal() {
  const router = useRouter();
  const { items, totals, clearCart } = useCart();
  const { isCartOpen, closeCart } = useUIStore();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <Modal 
      isOpen={isCartOpen} 
      onClose={closeCart}
      className="max-w-md"
      showCloseButton={false}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider">
            Cart ({items.length})
          </h2>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-dark-gray hover:text-primary text-sm underline transition-colors"
            >
              Remove all
            </button>
          )}
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-gray mb-6">Your cart is empty</p>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-dark-gray uppercase text-sm">Total</span>
              <span className="text-lg font-bold">{formatPrice(totals.subtotal)}</span>
            </div>

            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout}
              className="w-full"
            >
              Checkout
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}