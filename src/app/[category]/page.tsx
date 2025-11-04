// src/app/[category]/page.tsx

import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryLinks } from '@/components/shared/CategoryLinks';
import { BestGear } from '@/components/shared/BestGear';
import { products } from '@/data/products';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params; // ✅ Await the Promise

  // Validate category
  if (!['headphones', 'speakers', 'earphones'].includes(category)) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = products
    .filter((product) => product.category === category)
    .sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));

  return (
    <main>
      <section className="bg-dark text-white">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center">
            {category}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-8 py-16 lg:py-32">
        <div className="space-y-24 lg:space-y-40">
          {categoryProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-8 py-16 lg:py-32">
        <CategoryLinks />
      </section>

      <BestGear />
    </main>
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  return [
    { category: 'headphones' },
    { category: 'speakers' },
    { category: 'earphones' },
  ];
}
