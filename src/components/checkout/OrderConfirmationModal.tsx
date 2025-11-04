// src/components/checkout/OrderConfirmationModal.tsx - Success modal after checkout

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/zustand/useUIStore';
import { formatPrice, shortenProductName } from '@/lib/utils';

interface OrderConfirmationModalProps {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  grandTotal: number;
}

export function OrderConfirmationModal({
  orderId,
  items,
  grandTotal,
}: OrderConfirmationModalProps) {
  const router = useRouter();
  const { isOrderConfirmationOpen, closeOrderConfirmation } = useUIStore();
  const [showAllItems, setShowAllItems] = React.useState(false);

  const firstItem = items[0];
  const otherItemsCount = items.length - 1;

  const handleBackToHome = () => {
    closeOrderConfirmation();
    router.push('/');
  };

  return (
    <Modal
      isOpen={isOrderConfirmationOpen}
      onClose={closeOrderConfirmation}
      className="max-w-lg"
      showCloseButton={false}
    >
      <div className="p-8 lg:p-12">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-4">
          Thank You <br />For Your Order
        </h2>

        <p className="text-dark-gray mb-6">
          You will receive an email confirmation shortly.
        </p>

        {/* Order Summary */}
        <div className="rounded-lg overflow-hidden mb-8">
          {/* Items Section */}
          <div className="bg-light-gray p-6">
            {/* First Item */}
            {firstItem && (
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">
                    {shortenProductName(firstItem.name)}
                  </h3>
                  <p className="text-dark-gray text-xs font-bold">
                    {formatPrice(firstItem.price)}
                  </p>
                </div>
                <div className="text-dark-gray text-sm font-bold">
                  x{firstItem.quantity}
                </div>
              </div>
            )}

            {/* Other Items Toggle */}
            {otherItemsCount > 0 && (
              <>
                <hr className="my-3 border-dark/10" />
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="text-dark-gray text-xs hover:text-primary transition-colors w-full text-center"
                >
                  {showAllItems
                    ? 'View less'
                    : `and ${otherItemsCount} other item${otherItemsCount > 1 ? 's' : ''}`}
                </button>

                {showAllItems && (
                  <div className="space-y-3 mt-3">
                    {items.slice(1).map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm">
                            {shortenProductName(item.name)}
                          </h3>
                          <p className="text-dark-gray text-xs font-bold">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="text-dark-gray text-sm font-bold">
                          x{item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Grand Total Section */}
          <div className="bg-dark text-white p-6">
            <p className="text-white/50 text-sm uppercase mb-2">Grand Total</p>
            <p className="text-lg font-bold">{formatPrice(grandTotal)}</p>
          </div>
        </div>

        {/* Back to Home Button */}
        <Button onClick={handleBackToHome} className="w-full">
          Back to Home
        </Button>
      </div>
    </Modal>
  );
}