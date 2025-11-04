// src/components/shared/BestGear.tsx - "Bringing you the BEST audio gear" section

import React from 'react';
import Image from 'next/image';

export function BestGear() {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content (Desktop: Left, Mobile: Bottom) */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 uppercase">
            Bringing you the <span className="text-primary">best</span> audio gear
          </h2>
          <p className="text-dark-gray leading-relaxed">
            Located at the heart of New York City, Audiophile is the premier store for high end 
            headphones, earphones, speakers, and audio accessories. We have a large showroom and 
            luxury demonstration rooms available for you to browse and experience a wide range of 
            our products. Stop by our store to meet some of the fantastic people who make Audiophile 
            the best place to buy your portable audio equipment.
          </p>
        </div>

        {/* Image (Desktop: Right, Mobile: Top) */}
        <div className="order-1 lg:order-2 rounded-lg overflow-hidden">
          {/* Desktop Image */}
          <Image
            src="/assets/shared/desktop/image-best-gear.jpg"
            alt="Person listening to music"
            width={540}
            height={588}
            className="hidden lg:block w-full h-auto rounded-lg"
          />
          {/* Tablet Image */}
          <Image
            src="/assets/shared/tablet/image-best-gear.jpg"
            alt="Person listening to music"
            width={689}
            height={300}
            className="hidden md:block lg:hidden w-full h-auto rounded-lg"
          />
          {/* Mobile Image */}
          <Image
            src="/assets/shared/mobile/image-best-gear.jpg"
            alt="Person listening to music"
            width={327}
            height={300}
            className="md:hidden w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}