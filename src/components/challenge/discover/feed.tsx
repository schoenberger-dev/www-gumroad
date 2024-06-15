'use client';

import { ProductCard } from './product-card';

export function Feed({ products }: { products: Product[] }) {
  const half = Math.floor(products.length / 2);
  let recommendations: Product[] = [];
  let staffPicks: Product[] = [];

  if (products.length) {
    recommendations = products.slice(0, half);
    staffPicks = products.slice(half);
  }

  return (
    <section className="site-px flex flex-col gap-y-8 md:py-16">
      <div className="space-y-4">
        <h2 className="text-2xl">Recommendations for you</h2>
        <div className="grid grid-cols-feed gap-4">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl">Staff picks</h2>
        <div className="grid grid-cols-feed gap-4">
          {staffPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
