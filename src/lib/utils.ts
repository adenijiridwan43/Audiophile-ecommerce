// src/lib/utils.ts - Utility functions and calculations

import { CartItem, CartTotals } from '@/types/index';
import { SHIPPING_COST, VAT_RATE } from '@/lib/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================
// TAILWIND UTILS
// ============================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// CART CALCULATIONS (Frontend Mentor Spec)
// ============================================
export function calculateCartTotals(items: CartItem[]): CartTotals {
  // 1. Calculate subtotal (sum of all products)
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // 2. Calculate VAT (20% of subtotal, excluding shipping)
  const vat = subtotal * VAT_RATE;

  // 3. Shipping is flat $50
  const shipping = SHIPPING_COST;

  // 4. Grand total
  const grandTotal = subtotal + vat + shipping;

  return {
    subtotal,
    vat,
    shipping,
    grandTotal,
  };
}

// ============================================
// PRICE FORMATTING
// ============================================
export function formatPrice(amount: number): string {
  return `$ ${amount.toLocaleString('en-US')}`;
}

export function formatPriceWithCommas(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// ============================================
// CART UTILS
// ============================================
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function findCartItem(items: CartItem[], productId: string): CartItem | undefined {
  return items.find(item => item.id === productId);
}

export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0;
}

// ============================================
// PRODUCT NAME UTILS
// ============================================
export function shortenProductName(name: string): string {
  // XX99 MARK II HEADPHONES -> XX99 MK II
  return name
    .replace(/HEADPHONES?/gi, '')
    .replace(/SPEAKERS?/gi, '')
    .replace(/EARPHONES?/gi, '')
    .replace(/MARK/gi, 'MK')
    .replace(/WIRELESS/gi, '')
    .trim();
}

// ============================================
// ORDER ID GENERATOR
// ============================================
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
}

// ============================================
// DATE FORMATTING
// ============================================
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================
// RESPONSIVE IMAGE UTILS
// ============================================
export function getResponsiveImage(
  images: { mobile: string; tablet: string; desktop: string },
  size: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): string {
  return images[size];
}

// ============================================
// VALIDATION UTILS
// ============================================
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^[\d\w\s\-]+$/;
  return zipRegex.test(zipCode) && zipCode.length >= 3;
}

export function isValidEMoneyNumber(number: string): boolean {
  return /^\d{9}$/.test(number);
}

export function isValidEMoneyPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

// ============================================
// STRING UTILS
// ============================================
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

// ============================================
// DELAY UTILITY (for loading states)
// ============================================
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// DEBOUNCE UTILITY
// ============================================
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// LOCAL STORAGE UTILS (with error handling)
// ============================================
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

// ============================================
// ERROR HANDLING
// ============================================
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// ============================================
// FORM UTILS
// ============================================
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

// ============================================
// ARRAY UTILS
// ============================================
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// ============================================
// SCROLL UTILS
// ============================================
export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, behavior });
}

export function disableScroll(): void {
  if (typeof window === 'undefined') return;
  document.body.style.overflow = 'hidden';
}

export function enableScroll(): void {
  if (typeof window === 'undefined') return;
  document.body.style.overflow = '';
}