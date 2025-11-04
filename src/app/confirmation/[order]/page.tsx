// src/app/confirmation/[orderId]/page.tsx - Order confirmation page

'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Package, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDateTime, shortenProductName } from '@/lib/utils';

interface ConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const order = useQuery(api.orders.getOrderByOrderId, {
    orderId: params.orderId,
  });

  if (order === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-dark-gray">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (order === null) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-dark-gray mb-8">
            We couldn't find an order with ID: {params.orderId}
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-very-light-gray min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Success Header */}
        <div className="bg-white rounded-lg p-8 lg:p-12 mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold uppercase mb-4">
            Order Confirmed!
          </h1>
          <p className="text-dark-gray mb-2">
            Thank you, {order.customerDetails.name}
          </p>
          <p className="text-sm text-dark-gray">
            Order ID: <span className="font-bold">{order.orderId}</span>
          </p>
          <p className="text-sm text-dark-gray">
            {formatDateTime(order.createdAt)}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold uppercase">Order Items</h2>
            </div>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-light-gray shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">
                      {shortenProductName(item.name)}
                    </h3>
                    <p className="text-dark-gray text-xs">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold uppercase">Shipping To</h2>
              </div>
              <div className="text-dark-gray">
                <p className="font-bold text-dark mb-1">
                  {order.customerDetails.name}
                </p>
                <p>{order.shippingDetails.address}</p>
                <p>
                  {order.shippingDetails.city}, {order.shippingDetails.zipCode}
                </p>
                <p>{order.shippingDetails.country}</p>
                <p className="mt-4">{order.customerDetails.phoneNumber}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-bold uppercase mb-6">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-gray">Subtotal</span>
                  <span className="font-bold">
                    {formatPrice(order.totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-gray">Shipping</span>
                  <span className="font-bold">
                    {formatPrice(order.totals.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-gray">VAT (Included)</span>
                  <span className="font-bold">
                    {formatPrice(order.totals.vat)}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg">
                  <span className="text-dark-gray">Grand Total</span>
                  <span className="font-bold text-primary">
                    {formatPrice(order.totals.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}