// convex/schema.ts - Convex Database Schema

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ============================================
  // ORDERS TABLE
  // ============================================
  orders: defineTable({
    // Order identification
    orderId: v.string(), // e.g., "ORD-ABC123"
    
    // Customer details
    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phoneNumber: v.string(),
    }),
    
    // Shipping address
    shippingDetails: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    
    // Payment method
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
    
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        shortName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    
    // Order totals
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    
    // Order status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    
    // Metadata
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_orderId", ["orderId"])
    .index("by_email", ["customerDetails.email"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),
});