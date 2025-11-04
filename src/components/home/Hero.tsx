// src/components/home/Hero.tsx - Homepage Hero Section

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="bg-dark text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        {/* Desktop */}
        <Image
          src="/assets/home/desktop/image-hero.jpg"
          alt="XX99 Mark II Headphones"
          fill
          className="hidden lg:block object-cover object-center"
          priority
        />
        {/* Tablet */}
        <Image
          src="/assets/home/tablet/image-header.jpg"
          alt="XX99 Mark II Headphones"
          fill
          className="hidden md:block lg:hidden object-cover object-center"
          priority
        />
        {/* Mobile */}
        <Image
          src="/assets/home/mobile/image-header.jpg"
          alt="XX99 Mark II Headphones"
          fill
          className="md:hidden object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="py-24 lg:py-32 max-w-md">
          {/* New Product Tag */}
          <p className="text-white/50 uppercase tracking-[10px] text-sm mb-6">
            New Product
          </p>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold uppercase mb-6 leading-tight">
            XX99 Mark II <br />Headphones
          </h1>

          {/* Description */}
          <p className="text-white/75 leading-relaxed mb-8 max-w-sm">
            Experience natural, lifelike audio and exceptional build quality made for the 
            passionate music enthusiast.
          </p>

          {/* CTA Button */}
          <Link href="/headphones/xx99-mark-two-headphones">
            <Button>See Product</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}