// src/components/layout/Header.tsx - Main Header

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/context/CartContext';
import { useUIStore } from '@/store/zustand/useUIStore';
import { cn } from '@/lib/utils';

export function Header() {
  const { itemCount } = useCart();
  const { toggleCart, toggleMobileMenu } = useUIStore();

  return (
    <header className="bg-dark text-white sticky top-0 z-40">
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tight hover:text-primary transition-colors"
            >
              audiophile
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/headphones"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Headphones
              </Link>
              <Link
                href="/speakers"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Speakers
              </Link>
              <Link
                href="/earphones"
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                Earphones
              </Link>
            </nav>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}