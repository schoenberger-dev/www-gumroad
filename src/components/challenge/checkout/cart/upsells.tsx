'use client';

import { ProductCard } from '../../discover/product-card';

export function Upsells({ upsells }: { upsells: ProductsByArtist[] }) {
  return (
    <div className="w-full max-w-2xl space-y-6 border-t border-foreground/20 pt-8">
      <div className="text-xl md:text-2xl">
        Customers who bought these items also bought
      </div>
      {upsells.map((group) => (
        <div key={group.artist.username}>
          <div className="sticky top-0 z-[1] bg-background/90 py-1 backdrop-blur md:relative md:bg-none md:py-0 md:backdrop-blur-none">
            {group.artist.name}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                initialDelay={index * 0.2}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
