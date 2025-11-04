// src/components/product/ProductGallery.tsx - Product image gallery

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductGalleryProps {
  gallery: Product['gallery'];
}

export function ProductGallery({ gallery }: ProductGalleryProps) {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* First Image */}
        <div className="relative rounded-lg overflow-hidden aspect-square">
          <Image
            src={gallery.first.desktop}
            alt="Product gallery image 1"
            fill
            className="object-cover"
          />
        </div>

        {/* Second Image */}
        <div className="relative rounded-lg overflow-hidden aspect-square">
          <Image
            src={gallery.second.desktop}
            alt="Product gallery image 2"
            fill
            className="object-cover"
          />
        </div>

        {/* Third Image - Takes 2 columns */}
        <div className="col-span-2 relative rounded-lg overflow-hidden aspect-2/1 lg:aspect-square">
          <Image
            src={gallery.third.desktop}
            alt="Product gallery image 3"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}