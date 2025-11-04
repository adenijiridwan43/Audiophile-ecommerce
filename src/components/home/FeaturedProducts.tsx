// src/components/home/FeaturedProducts.tsx - Featured product showcases

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function FeaturedProducts() {
  return (
    <section className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div className="space-y-8 lg:space-y-12">
        {/* ZX9 Speaker - Orange Background */}
        <div className="bg-primary rounded-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-12 lg:p-24">
            {/* Speaker Image */}
            <div className="relative h-72 lg:h-96 flex items-end justify-center">
              <Image
                src="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                width={410}
                height={493}
                className="w-48 lg:w-96 h-auto object-contain"
              />
              {/* Decorative Circles */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-[558px] h-[558px] rounded-full border border-white/20" />
                <div className="absolute w-[944px] h-[944px] rounded-full border border-white/10" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left text-white">
              <h2 className="text-4xl lg:text-6xl font-bold uppercase mb-6">
                ZX9 <br />Speaker
              </h2>
              <p className="text-white/75 leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
                Upgrade to premium speakers that are phenomenally built to deliver truly 
                remarkable sound.
              </p>
              <Link href="/speakers/zx9-speaker">
                <Button variant="secondary">See Product</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker - Image Background */}
        <div className="relative rounded-lg overflow-hidden h-80">
          <Image
            src="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-12 lg:px-24">
              <h2 className="text-3xl font-bold uppercase mb-8">
                ZX7 Speaker
              </h2>
              <Link href="/speakers/zx7-speaker">
                <Button variant="outline">See Product</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* YX1 Earphones - Split Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden h-80">
            <Image
              src="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="bg-light-gray rounded-lg flex items-center p-12 lg:p-24">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-8">
                YX1 Earphones
              </h2>
              <Link href="/earphones/yx1-earphones">
                <Button variant="outline">See Product</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}