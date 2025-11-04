// src/components/product/ProductFeatures.tsx - Features and In The Box sections

import React from 'react';
import { Product } from '@/types';

interface ProductFeaturesProps {
  product: Product;
}

export function ProductFeatures({ product }: ProductFeaturesProps) {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Features */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-6">
            Features
          </h2>
          <div className="text-dark-gray leading-relaxed whitespace-pre-line">
            {product.features}
          </div>
        </div>

        {/* In The Box */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-6">
            In The Box
          </h2>
          <ul className="space-y-2">
            {product.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-6">
                <span className="text-primary font-bold min-w-[2ch]">
                  {item.quantity}x
                </span>
                <span className="text-dark-gray">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}