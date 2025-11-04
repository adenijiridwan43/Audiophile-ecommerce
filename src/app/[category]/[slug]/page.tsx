// src/app/[category]/[slug]/page.tsx - Product detail page (Next.js 15 compatible)

import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductGallery } from '@/components/product/ProductGallery';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { CategoryLinks } from '@/components/shared/CategoryLinks';
import { BestGear } from '@/components/shared/BestGear';
import { products } from '@/data/products';

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// ✅ Await params in async page component
export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  // Find product
  const product = products.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main>
      {/* Product Detail Section */}
      <ProductDetail product={product} />

      {/* Features & In The Box */}
      <ProductFeatures product={product} />

      {/* Gallery */}
      <ProductGallery gallery={product.gallery} />

      {/* Related Products */}
      <RelatedProducts products={product.others} category={category} />

      {/* Category Links */}
      <section className="container mx-auto px-6 lg:px-8 py-16 lg:py-32">
        <CategoryLinks />
      </section>

      {/* Best Gear Section */}
      <BestGear />
    </main>
  );
}

// ✅ Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

// ✅ Make metadata generation async and await params
export async function generateMetadata({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = products.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Audiophile`,
    description: product.description,
  };
}
