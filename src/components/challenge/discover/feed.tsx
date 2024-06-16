'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './product-card';
import easings from '@/lib/ui/easings';

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
        <motion.h2
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: easings.OutQuad }}
          className="text-2xl"
        >
          Recommendations for you
        </motion.h2>
        <div className="grid grid-cols-feed gap-4">
          {recommendations.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              initialDelay={0.2}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: easings.OutQuad, delay: 0.4 }}
          className="text-2xl"
        >
          Staff picks
        </motion.h2>
        <div className="grid grid-cols-feed gap-4">
          {staffPicks.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              initialDelay={0.6}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
