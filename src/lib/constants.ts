// src/lib/constants.ts - All application constants

// ============================================
// PRICING CONSTANTS (Frontend Mentor Spec)
// ============================================
export const SHIPPING_COST = 50;
export const VAT_RATE = 0.2; // 20%
export const VAT_PERCENTAGE = "20%";

// ============================================
// DESIGN SYSTEM COLORS
// ============================================
export const COLORS = {
  primary: '#D87D4A',
  primaryHover: '#FBAF85',
  black: '#000000',
  darkGray: '#101010',
  mediumGray: '#4C4C4C',
  lightGray: '#F1F1F1',
  veryLightGray: '#FAFAFA',
  white: '#FFFFFF',
  error: '#CD2C2C',
  success: '#4BB543',
} as const;

// ============================================
// TYPOGRAPHY
// ============================================
export const FONTS = {
  primary: 'Manrope, sans-serif',
} as const;

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1440px',
} as const;

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  home: '/',
  headphones: '/headphones',
  speakers: '/speakers',
  earphones: '/earphones',
  checkout: '/checkout',
  confirmation: (orderId: string) => `/confirmation/${orderId}`,
  product: (category: string, slug: string) => `/${category}/${slug}`,
} as const;

// ============================================
// LOCAL STORAGE KEYS
// ============================================
export const STORAGE_KEYS = {
  cart: 'audiophile-cart',
  checkout: 'audiophile-checkout',
} as const;

// ============================================
// VALIDATION RULES
// ============================================
export const VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]+$/,
    minLength: 10,
    maxLength: 20,
  },
  zipCode: {
    pattern: /^[\d\w\s\-]+$/,
    minLength: 3,
    maxLength: 10,
  },
  eMoneyNumber: {
    pattern: /^\d{9}$/,
    length: 9,
  },
  eMoneyPin: {
    pattern: /^\d{4}$/,
    length: 4,
  },
} as const;

// ============================================
// QUANTITY LIMITS
// ============================================
export const QUANTITY_LIMITS = {
  min: 1,
  max: 10,
} as const;

// ============================================
// API ENDPOINTS
// ============================================
export const API_ENDPOINTS = {
  sendEmail: '/api/send-email',
} as const;

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  invalidZipCode: 'Please enter a valid ZIP code',
  invalidEMoneyNumber: 'e-Money Number must be 9 digits',
  invalidEMoneyPin: 'e-Money PIN must be 4 digits',
  namePattern: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  nameTooShort: 'Name must be at least 2 characters',
  nameTooLong: 'Name cannot exceed 50 characters',
  quantityMin: 'Quantity must be at least 1',
  quantityMax: `Quantity cannot exceed ${QUANTITY_LIMITS.max}`,
  emptyCart: 'Your cart is empty',
  networkError: 'Network error. Please try again.',
  orderFailed: 'Failed to create order. Please try again.',
  emailFailed: 'Failed to send confirmation email.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  orderCreated: 'Order created successfully!',
  emailSent: 'Confirmation email sent!',
  addedToCart: 'Added to cart',
  removedFromCart: 'Removed from cart',
  cartCleared: 'Cart cleared',
} as const;

// ============================================
// ANIMATION DURATIONS
// ============================================
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// ============================================
// TOAST CONFIG
// ============================================
export const TOAST_CONFIG = {
  duration: 3000,
  position: 'top-right',
} as const;

// ============================================
// CATEGORY CONFIG
// ============================================
export const CATEGORIES = [
  {
    name: 'HEADPHONES',
    slug: 'headphones',
    image: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
  },
  {
    name: 'SPEAKERS',
    slug: 'speakers',
    image: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
  },
  {
    name: 'EARPHONES',
    slug: 'earphones',
    image: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
  },
] as const;

// ============================================
// PRODUCT NAME SHORTENER (for cart display)
// ============================================
export const shortenProductName = (name: string): string => {
  // XX99 MARK II HEADPHONES -> XX99 MK II
  return name
    .replace(/HEADPHONES?/gi, '')
    .replace(/SPEAKERS?/gi, '')
    .replace(/EARPHONES?/gi, '')
    .replace(/MARK/gi, 'MK')
    .replace(/WIRELESS/gi, '')
    .trim();
};

// ============================================
// ORDER ID GENERATOR
// ============================================
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};