// src/lib/validations.ts - Zod validation schemas

import { z } from 'zod';
import { VALIDATION, ERROR_MESSAGES } from '@/lib/contants';

// ============================================
// BILLING DETAILS SCHEMA
// ============================================
export const billingDetailsSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(VALIDATION.name.minLength, ERROR_MESSAGES.nameTooShort)
    .max(VALIDATION.name.maxLength, ERROR_MESSAGES.nameTooLong)
    .regex(VALIDATION.name.pattern, ERROR_MESSAGES.namePattern),
  
  email: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .regex(VALIDATION.email.pattern, ERROR_MESSAGES.invalidEmail),
  
  phoneNumber: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(VALIDATION.phone.minLength, ERROR_MESSAGES.invalidPhone)
    .max(VALIDATION.phone.maxLength, ERROR_MESSAGES.invalidPhone)
    .regex(VALIDATION.phone.pattern, ERROR_MESSAGES.invalidPhone),
});

// ============================================
// SHIPPING INFO SCHEMA
// ============================================
export const shippingInfoSchema = z.object({
  address: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(5, 'Address must be at least 5 characters'),
  
  zipCode: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(VALIDATION.zipCode.minLength, ERROR_MESSAGES.invalidZipCode)
    .max(VALIDATION.zipCode.maxLength, ERROR_MESSAGES.invalidZipCode)
    .regex(VALIDATION.zipCode.pattern, ERROR_MESSAGES.invalidZipCode),
  
  city: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(2, 'City must be at least 2 characters'),
  
  country: z
    .string()
    .min(1, ERROR_MESSAGES.required)
    .min(2, 'Country must be at least 2 characters'),
});

// ============================================
// PAYMENT DETAILS SCHEMA (with conditional validation)
// ============================================
export const paymentDetailsSchema = z.discriminatedUnion('paymentMethod', [
  // e-Money payment
  z.object({
    paymentMethod: z.literal('e-money'),
    eMoneyNumber: z
      .string()
      .min(1, ERROR_MESSAGES.required)
      .regex(VALIDATION.eMoneyNumber.pattern, ERROR_MESSAGES.invalidEMoneyNumber),
    eMoneyPin: z
      .string()
      .min(1, ERROR_MESSAGES.required)
      .regex(VALIDATION.eMoneyPin.pattern, ERROR_MESSAGES.invalidEMoneyPin),
  }),
  // Cash on Delivery
  z.object({
    paymentMethod: z.literal('cash'),
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  }),
]);

// ============================================
// COMPLETE CHECKOUT FORM SCHEMA
// ============================================
export const checkoutFormSchema = z.object({
  billingDetails: billingDetailsSchema,
  shippingInfo: shippingInfoSchema,
  paymentDetails: paymentDetailsSchema,
});

// ============================================
// QUANTITY VALIDATION
// ============================================
export const quantitySchema = z
  .number()
  .int()
  .min(1, ERROR_MESSAGES.quantityMin)
  .max(10, ERROR_MESSAGES.quantityMax);

// ============================================
// TYPE EXPORTS
// ============================================
export type BillingDetailsInput = z.infer<typeof billingDetailsSchema>;
export type ShippingInfoInput = z.infer<typeof shippingInfoSchema>;
export type PaymentDetailsInput = z.infer<typeof paymentDetailsSchema>;
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

/**
 * Validate billing details
 */
export function validateBillingDetails(data: unknown) {
  return billingDetailsSchema.safeParse(data);
}

/**
 * Validate shipping info
 */
export function validateShippingInfo(data: unknown) {
  return shippingInfoSchema.safeParse(data);
}

/**
 * Validate payment details
 */
export function validatePaymentDetails(data: unknown) {
  return paymentDetailsSchema.safeParse(data);
}

/**
 * Validate entire checkout form
 */
export function validateCheckoutForm(data: unknown) {
  return checkoutFormSchema.safeParse(data);
}

/**
 * Validate quantity
 */
export function validateQuantity(quantity: number) {
  return quantitySchema.safeParse(quantity);
}

// ============================================
// FORMAT ZOD ERRORS FOR DISPLAY
// ============================================
export function formatZodErrors(errors: z.ZodError) {
  const formattedErrors: Record<string, string> = {};
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.');
    formattedErrors[path] = error.message;
  });
  
  return formattedErrors;
}

// ============================================
// FIELD-LEVEL VALIDATORS (for real-time validation)
// ============================================

export function validateEmailField(email: string): string | null {
  if (!email) return ERROR_MESSAGES.required;
  if (!VALIDATION.email.pattern.test(email)) return ERROR_MESSAGES.invalidEmail;
  return null;
}

export function validatePhoneField(phone: string): string | null {
  if (!phone) return ERROR_MESSAGES.required;
  if (!VALIDATION.phone.pattern.test(phone)) return ERROR_MESSAGES.invalidPhone;
  if (phone.length < VALIDATION.phone.minLength) return ERROR_MESSAGES.invalidPhone;
  return null;
}

export function validateNameField(name: string): string | null {
  if (!name) return ERROR_MESSAGES.required;
  if (name.length < VALIDATION.name.minLength) return ERROR_MESSAGES.nameTooShort;
  if (name.length > VALIDATION.name.maxLength) return ERROR_MESSAGES.nameTooLong;
  if (!VALIDATION.name.pattern.test(name)) return ERROR_MESSAGES.namePattern;
  return null;
}

export function validateZipCodeField(zipCode: string): string | null {
  if (!zipCode) return ERROR_MESSAGES.required;
  if (zipCode.length < VALIDATION.zipCode.minLength) return ERROR_MESSAGES.invalidZipCode;
  if (!VALIDATION.zipCode.pattern.test(zipCode)) return ERROR_MESSAGES.invalidZipCode;
  return null;
}

export function validateEMoneyNumberField(number: string): string | null {
  if (!number) return ERROR_MESSAGES.required;
  if (!VALIDATION.eMoneyNumber.pattern.test(number)) return ERROR_MESSAGES.invalidEMoneyNumber;
  return null;
}

export function validateEMoneyPinField(pin: string): string | null {
  if (!pin) return ERROR_MESSAGES.required;
  if (!VALIDATION.eMoneyPin.pattern.test(pin)) return ERROR_MESSAGES.invalidEMoneyPin;
  return null;
}

export function validateRequiredField(value: string, fieldName: string = 'This field'): string | null {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
}