// convex/orders.ts - Order mutations and queries

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// CREATE ORDER MUTATION
// ============================================
export const createOrder = mutation({
  args: {
    orderId: v.string(),
    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phoneNumber: v.string(),
    }),
    shippingDetails: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
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
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const orderId = await ctx.db.insert("orders", {
      orderId: args.orderId,
      customerDetails: args.customerDetails,
      shippingDetails: args.shippingDetails,
      paymentMethod: args.paymentMethod,
      items: args.items,
      totals: args.totals,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    
    return orderId;
  },
});

// ============================================
// GET ORDER BY ORDER ID
// ============================================
export const getOrderByOrderId = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
    
    return order;
  },
});

// ============================================
// GET ORDER BY DOCUMENT ID
// ============================================
export const getOrderById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// ============================================
// GET ORDERS BY EMAIL
// ============================================
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email")
      .filter((q) => q.eq(q.field("customerDetails.email"), args.email))
      .order("desc")
      .collect();
  },
});

// ============================================
// GET ALL ORDERS (with pagination)
// ============================================
export const getAllOrders = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    return await ctx.db
      .query("orders")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit);
  },
});

// ============================================
// UPDATE ORDER STATUS
// ============================================
export const updateOrderStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    await ctx.db.patch(order._id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    
    return order._id;
  },
});

// ============================================
// DELETE ORDER (soft delete by setting status)
// ============================================
export const cancelOrder = mutation({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    await ctx.db.patch(order._id, {
      status: "cancelled",
      updatedAt: Date.now(),
    });
    
    return order._id;
  },
});

// ============================================
// GET ORDER STATISTICS
// ============================================
export const getOrderStats = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.totals.grandTotal;
    }, 0);
    
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalOrders,
      totalRevenue,
      statusCounts,
    };
  },
});