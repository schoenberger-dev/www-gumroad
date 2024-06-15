'use client';

import { Header } from './layout';
import { Feed } from './feed';

export function Discover({ products }: { products: Product[] }) {
  return (
    <main>
      <Header />
      <Feed products={products} />
    </main>
  );
}
