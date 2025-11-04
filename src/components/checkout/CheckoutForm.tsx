// src/components/checkout/CheckoutForm.tsx - Main checkout form

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useCart } from '@/store/context/CartContext';
import { useUIStore } from '@/store/zustand/useUIStore';
import { checkoutFormSchema, CheckoutFormInput } from '@/lib/validations';
import { generateOrderId } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/Radio';
import { OrderSummary } from './OrderSummary';

export function CheckoutForm() {
  const router = useRouter();
  const { items, totals, clearCart } = useCart();
  const { setLoading, openOrderConfirmation } = useUIStore();
  const [paymentMethod, setPaymentMethod] = useState<'e-money' | 'cash'>('e-money');
  
  const createOrder = useMutation(api.orders.createOrder);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInput>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentDetails: {
        paymentMethod: 'e-money',
      },
    },
  });

  const onSubmit = async (data: CheckoutFormInput) => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Generate order ID
      const orderId = generateOrderId();

      // Create order in Convex
      await createOrder({
        orderId,
        customerDetails: data.billingDetails,
        shippingDetails: data.shippingInfo,
        paymentMethod: data.paymentDetails.paymentMethod,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          shortName: item.shortName,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totals: {
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          vat: totals.vat,
          grandTotal: totals.grandTotal,
        },
      });

      // Send confirmation email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: data.billingDetails.email,
          customerName: data.billingDetails.name,
          orderId,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            shortName: item.shortName,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totals,
          shippingAddress: `${data.shippingInfo.address}\n${data.shippingInfo.city}, ${data.shippingInfo.zipCode}\n${data.shippingInfo.country}`,
        }),
      });

      // Clear cart and redirect
      clearCart();
      openOrderConfirmation();
      setTimeout(() => {
        router.push(`/confirmation/${orderId}`);
      }, 2000);

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to complete checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 lg:px-8 py-12">
      <button
        onClick={() => router.back()}
        className="text-dark-gray hover:text-primary mb-8 transition-colors"
      >
        Go Back
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 bg-white rounded-lg p-8 lg:p-12">
            <h1 className="text-3xl font-bold uppercase mb-8">Checkout</h1>

            {/* Billing Details */}
            <div className="mb-12">
              <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-4">
                Billing Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  placeholder="Alexei Ward"
                  error={errors.billingDetails?.name?.message}
                  {...register('billingDetails.name')}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="[email protected]"
                  error={errors.billingDetails?.email?.message}
                  {...register('billingDetails.email')}
                />
                <Input
                  label="Phone Number"
                  placeholder="+1 202-555-0136"
                  error={errors.billingDetails?.phoneNumber?.message}
                  {...register('billingDetails.phoneNumber')}
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-12">
              <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-4">
                Shipping Info
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    placeholder="1137 Williams Avenue"
                    error={errors.shippingInfo?.address?.message}
                    {...register('shippingInfo.address')}
                  />
                </div>
                <Input
                  label="ZIP Code"
                  placeholder="10001"
                  error={errors.shippingInfo?.zipCode?.message}
                  {...register('shippingInfo.zipCode')}
                />
                <Input
                  label="City"
                  placeholder="New York"
                  error={errors.shippingInfo?.city?.message}
                  {...register('shippingInfo.city')}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Country"
                    placeholder="United States"
                    error={errors.shippingInfo?.country?.message}
                    {...register('shippingInfo.country')}
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-primary text-sm font-bold uppercase tracking-wider mb-4">
                Payment Details
              </h2>
              <RadioGroup
                label="Payment Method"
                options={[
                  { value: 'e-money', label: 'e-Money' },
                  { value: 'cash', label: 'Cash on Delivery' },
                ]}
                value={paymentMethod}
                onChange={(value) => setPaymentMethod(value as 'e-money' | 'cash')}
              />

              {paymentMethod === 'e-money' && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Input
                    label="e-Money Number"
                    placeholder="238521993"
                    error={errors.paymentDetails?.eMoneyNumber?.message}
                    {...register('paymentDetails.eMoneyNumber')}
                  />
                  <Input
                    label="e-Money PIN"
                    placeholder="6891"
                    type="password"
                    error={errors.paymentDetails?.eMoneyPin?.message}
                    {...register('paymentDetails.eMoneyPin')}
                  />
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="mt-6 p-6 bg-light-gray rounded-lg">
                  <p className="text-dark-gray text-sm leading-relaxed">
                    The 'Cash on Delivery' option enables you to pay in cash when our delivery 
                    courier arrives at your residence. Just make sure your address is correct so 
                    that your order will not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </form>
    </div>
  );
}