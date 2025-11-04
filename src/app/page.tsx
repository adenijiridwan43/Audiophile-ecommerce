// src/app/page.tsx - Homepage

import { Hero } from '@/components/home/Hero';
import { CategoryLinks } from '@/components/shared/CategoryLinks';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BestGear } from '@/components/shared/BestGear';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Category Links */}
      <section className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <CategoryLinks />
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Best Gear Section */}
      <BestGear />
    </main>
  );
}