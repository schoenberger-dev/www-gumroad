'use client';

import { useCartStore } from '@/providers/cart-store-provider';
import { Cart, Payment } from './';

export function Checkout() {
  const { cart } = useCartStore((state) => state);

  return (
    <main className="site-px grid auto-cols-[minmax(26rem,1fr)] grid-flow-col grid-cols-[2fr] gap-x-16 py-16">
      <Cart products={cart} />
      <Payment />
    </main>
  );
}
