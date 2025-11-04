// src/components/shared/CategoryLinks.tsx - Category Navigation Cards

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface CategoryLinksProps {
  onClick?: () => void;
}

export function CategoryLinks({ onClick }: CategoryLinksProps) {
  const categories = [
    {
      name: 'HEADPHONES',
      slug: 'headphones',
      image: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
    },
    {
      name: 'SPEAKERS',
      slug: 'speakers',
      image: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
    },
    {
      name: 'EARPHONES',
      slug: 'earphones',
      image: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/${category.slug}`}
          onClick={onClick}
          className="group relative bg-light-gray rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="flex flex-col items-center pt-20 pb-6">
            {/* Category Image */}
            <div className="absolute top-0 w-32 h-32 -translate-y-1/4">
              <Image
                src={category.image}
                alt={category.name}
                width={128}
                height={128}
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>

            {/* Category Name */}
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 mt-8">
              {category.name}
            </h3>

            {/* Shop Link */}
            <div className="flex items-center gap-3 text-dark-gray group-hover:text-primary transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider opacity-50">
                Shop
              </span>
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}