// src/types/index.ts - Complete Type System for Audiophile E-commerce

// ============================================
// PRODUCT TYPES
// ============================================
export interface Product {
  id: string;
  slug: string;
  name: string;
  image: ProductImage;
  category: 'headphones' | 'speakers' | 'earphones';
  categoryImage: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: BoxItem[];
  gallery: Gallery;
  others: RelatedProduct[];
}

export interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface BoxItem {
  quantity: number;
  item: string;
}

export interface Gallery {
  first: ProductImage;
  second: ProductImage;
  third: ProductImage;
}

export interface RelatedProduct {
  slug: string;
  name: string;
  image: ProductImage;
}

// ============================================
// CART TYPES
// ============================================
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  shortName: string; // e.g., "XX99 MK II"
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

// ============================================
// CHECKOUT TYPES
// ============================================
export interface CheckoutFormData {
  billingDetails: BillingDetails;
  shippingInfo: ShippingInfo;
  paymentDetails: PaymentDetails;
}

export interface BillingDetails {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ShippingInfo {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface PaymentDetails {
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

// ============================================
// ORDER TYPES
// ============================================
export interface Order {
  _id: string;
  _creationTime: number;
  orderId: string;
  customerDetails: BillingDetails;
  shippingDetails: ShippingInfo;
  paymentMethod: 'e-money' | 'cash';
  items: OrderItem[];
  totals: CartTotals;
  status: OrderStatus;
}

export interface OrderItem {
  id: string;
  name: string;
  shortName: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

// ============================================
// EMAIL TYPES
// ============================================
export interface EmailData {
  to: string;
  customerName: string;
  orderId: string;
  items: OrderItem[];
  totals: CartTotals;
  shippingAddress: string;
}

// ============================================
// FORM VALIDATION TYPES
// ============================================
export interface FormErrors {
  billingDetails?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  shippingInfo?: {
    address?: string;
    zipCode?: string;
    city?: string;
    country?: string;
  };
  paymentDetails?: {
    paymentMethod?: string;
    eMoneyNumber?: string;
    eMoneyPin?: string;
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OrderResponse {
  orderId: string;
  order: Order;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============================================
// UI STATE TYPES
// ============================================
export interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isCheckoutModalOpen: boolean;
  isLoading: boolean;
  toast: ToastState | null;
}

export interface ToastState {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// ============================================
// CONSTANTS
// ============================================
export const SHIPPING_COST = 50;
export const VAT_RATE = 0.2; // 20%

// ============================================
// UTILITY TYPES
// ============================================
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;