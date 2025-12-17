// src/app/[category]/[slug]/page.tsx - Product detail page (Next.js 15 compatible)

import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { ProductGallery } from '@/components/product/ProductGallery';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { CategoryLinks } from '@/components/shared/CategoryLinks';
import { BestGear } from '@/components/shared/BestGear';
import { products } from '@/data/products';

export default async function ProductPage({
  params,
}: {
  params: any;
}) {
  const resolved = await params;
  const { category, slug } = resolved;

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

// ✅ Make metadata generation accept params directly
export async function generateMetadata({ params }: { params: any }) {
  // unwrap params in case it's a Promise (Next may pass a Promise)
  const resolved = await params;
  const { category, slug } = resolved;

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
