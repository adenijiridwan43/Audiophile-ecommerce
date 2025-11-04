// src/components/product/ProductDetail.tsx - Product detail main section

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/context/CartContext';
import { useSuccessToast } from '@/store/zustand/useUIStore';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Product } from '@/types';
import { formatPrice, shortenProductName } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const showSuccess = useSuccessToast();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        shortName: shortenProductName(product.name),
        price: product.price,
        image: product.image.mobile,
      },
      quantity
    );
    
    showSuccess(`${shortenProductName(product.name)} added to cart`);
    setQuantity(1);
  };

  return (
    <section className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Product Image */}
        <div className="relative rounded-lg overflow-hidden bg-light-gray aspect-square">
          <Image
            src={product.image.desktop}
            alt={product.name}
            fill
            className="object-contain p-12"
            priority
          />
        </div>

        {/* Product Info */}
        <div>
          {product.new && (
            <p className="text-primary uppercase tracking-[10px] text-sm mb-4">
              New Product
            </p>
          )}
          
          <h1 className="text-3xl lg:text-4xl font-bold uppercase mb-6">
            {product.name}
          </h1>
          
          <p className="text-dark-gray leading-relaxed mb-8">
            {product.description}
          </p>
          
          <p className="text-lg font-bold mb-8">
            {formatPrice(product.price)}
          </p>
          
          {/* Add to Cart Controls */}
          <div className="flex items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(q => q + 1)}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            />
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}