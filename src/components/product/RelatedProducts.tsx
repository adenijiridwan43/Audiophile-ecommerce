// src/components/product/RelatedProducts.tsx - "You May Also Like" section

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product['others'];
  category: string;
}

export function RelatedProducts({ products, category }: RelatedProductsProps) {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <h2 className="text-2xl lg:text-3xl font-bold uppercase text-center mb-12">
        You May Also Like
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {products.map((product) => (
          <article key={product.slug} className="text-center">
            {/* Product Image */}
            <div className="relative rounded-lg overflow-hidden bg-light-gray aspect-square mb-8">
              <Image
                src={product.image.desktop}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>
            
            {/* Product Name */}
            <h3 className="text-xl font-bold uppercase mb-8">
              {product.name}
            </h3>
            
            {/* See Product Button */}
            <Link href={`/${category}/${product.slug}`}>
              <Button>See Product</Button>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}