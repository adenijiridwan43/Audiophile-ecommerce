// src/components/product/ProductCard.tsx - Product listing card

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  reverse?: boolean;
}

export function ProductCard({ product, reverse = false }: ProductCardProps) {
  // Handle both string and ProductImage types for categoryImage
  const categoryImageSrc = typeof product.categoryImage === 'string' 
    ? product.categoryImage 
    : product.categoryImage.desktop;

  return (
    <article className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Product Image */}
      <div className={`order-1 ${reverse ? 'lg:order-2' : ''}`}>
        <div className="relative rounded-lg overflow-hidden bg-light-gray aspect-square">
          <Image
            src={categoryImageSrc}
            alt={product.name}
            fill
            sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 100vw"
            className="object-contain p-8"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className={`order-2 text-center lg:text-left ${reverse ? 'lg:order-1' : ''}`}>
        {product.new && (
          <p className="text-primary uppercase tracking-[10px] text-sm mb-4">
            New Product
          </p>
        )}
        
        <h2 className="text-3xl lg:text-4xl font-bold uppercase mb-6">
          {product.name}
        </h2>
        
        <p className="text-dark-gray leading-relaxed mb-8">
          {product.description}
        </p>
        
        <Link href={`/${product.category}/${product.slug}`}>
          <Button>See Product</Button>
        </Link>
      </div>
    </article>
  );
}