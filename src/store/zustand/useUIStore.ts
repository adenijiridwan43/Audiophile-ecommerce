// src/store/zustand/useUIStore.ts - UI State Management with Zustand

import { create } from 'zustand';
import { ToastState } from '@/types/index';

// ============================================
// UI STORE INTERFACE
// ============================================
interface UIStore {
  // Cart Modal
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Mobile Menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  
  // Order Confirmation Modal
  isOrderConfirmationOpen: boolean;
  openOrderConfirmation: () => void;
  closeOrderConfirmation: () => void;
  
  // Loading State
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Toasts
  toasts: ToastState[];
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Close all modals
  closeAll: () => void;
}

// ============================================
// CREATE STORE
// ============================================
export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  isCartOpen: false,
  isMobileMenuOpen: false,
  isOrderConfirmationOpen: false,
  isLoading: false,
  toasts: [],
  
  // Cart Modal actions
  openCart: () => set({ isCartOpen: true, isMobileMenuOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ 
    isCartOpen: !state.isCartOpen,
    isMobileMenuOpen: false 
  })),
  
  // Mobile Menu actions
  openMobileMenu: () => set({ isMobileMenuOpen: true, isCartOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen,
    isCartOpen: false 
  })),
  
  // Order Confirmation Modal actions
  openOrderConfirmation: () => set({ 
    isOrderConfirmationOpen: true,
    isCartOpen: false,
    isMobileMenuOpen: false 
  }),
  closeOrderConfirmation: () => set({ isOrderConfirmationOpen: false }),
  
  // Loading state actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Toast actions
  addToast: (toast) => set((state) => ({
    toasts: [
      ...state.toasts,
      {
        ...toast,
        id: `toast-${Date.now()}-${Math.random()}`,
        duration: toast.duration || 3000,
      },
    ],
  })),
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  })),
  
  clearToasts: () => set({ toasts: [] }),
  
  // Close all modals
  closeAll: () => set({ 
    isCartOpen: false,
    isMobileMenuOpen: false,
    isOrderConfirmationOpen: false 
  }),
}));

// ============================================
// HELPER HOOKS
// ============================================

/**
 * Show success toast
 */
export function useSuccessToast() {
  const addToast = useUIStore((state) => state.addToast);
  
  return (message: string) => {
    addToast({
      type: 'success',
      message,
    });
  };
}

/**
 * Show error toast
 */
export function useErrorToast() {
  const addToast = useUIStore((state) => state.addToast);
  
  return (message: string) => {
    addToast({
      type: 'error',
      message,
    });
  };
}

/**
 * Show info toast
 */
export function useInfoToast() {
  const addToast = useUIStore((state) => state.addToast);
  
  return (message: string) => {
    addToast({
      type: 'info',
      message,
    });
  };
}