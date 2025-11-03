// src/store/context/CartContext.tsx - Cart State Management

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartItem, CartTotals } from '@/types';
import { calculateCartTotals, getCartItemCount, shortenProductName } from '@/lib/utils';
import { STORAGE_KEYS, QUANTITY_LIMITS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================
interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
}

// ============================================
// CONTEXT
// ============================================
const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isHydrated]);

  // Calculate totals
  const totals = calculateCartTotals(items);
  const itemCount = getCartItemCount(items);

  // ============================================
  // ADD ITEM TO CART
  // ============================================
  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          QUANTITY_LIMITS.max
        );
        
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Add new item
        const itemToAdd: CartItem = {
          ...newItem,
          quantity: Math.min(quantity, QUANTITY_LIMITS.max),
          shortName: shortenProductName(newItem.name),
        };
        
        return [...currentItems, itemToAdd];
      }
    });
  }, []);

  // ============================================
  // REMOVE ITEM FROM CART
  // ============================================
  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter(item => item.id !== itemId));
  }, []);

  // ============================================
  // UPDATE ITEM QUANTITY
  // ============================================
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    // Validate quantity
    const validQuantity = Math.max(
      QUANTITY_LIMITS.min,
      Math.min(quantity, QUANTITY_LIMITS.max)
    );
    
    setItems((currentItems) =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: validQuantity }
          : item
      )
    );
  }, []);

  // ============================================
  // CLEAR CART
  // ============================================
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // ============================================
  // CHECK IF ITEM IS IN CART
  // ============================================
  const isInCart = useCallback((itemId: string): boolean => {
    return items.some(item => item.id === itemId);
  }, [items]);

  // ============================================
  // GET ITEM QUANTITY
  // ============================================
  const getItemQuantity = useCallback((itemId: string): number => {
    const item = items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  }, [items]);

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value: CartContextType = {
    items,
    totals,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================
export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}