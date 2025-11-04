// src/components/layout/MobileMenu.tsx - Mobile Navigation Menu

'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUIStore } from '@/store/zustand/useUIStore';
import { CategoryLinks } from '@/components/shared/CategoryLinks';
import { disableScroll, enableScroll } from '@/lib/utils';

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  useEffect(() => {
    if (isMobileMenuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
    
    return () => enableScroll();
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 animate-in fade-in"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      
      {/* Menu Content */}
      <div className="relative bg-white rounded-b-lg animate-in slide-in-from-top-4 fade-in duration-200">
        <div className="container mx-auto px-6 py-20">
          <CategoryLinks onClick={closeMobileMenu} />
        </div>
      </div>
    </div>,
    document.body
  );
}