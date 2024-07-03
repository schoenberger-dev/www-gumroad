'use client';

import { useCartStore } from '@/providers/cart-store-provider';
import { useEffect, useState } from 'react';
import { Cart, CartSkeleton } from './cart';
import { Payment, PaymentSkeleton } from './payment';
import { EmptyCheckout } from './components';
import { updateCartCountCookie } from '@/stores/helpers';

export function Checkout({ initialCount }: { initialCount: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cart } = useCartStore((state) => state);

  useEffect(() => {
    setIsLoading(false);
    if (cart.length > 0) updateCartCountCookie(cart.length);
  }, [cart]);

  const Loading = () => (
    <>
      <CartSkeleton count={initialCount ?? cart.length} />
      <PaymentSkeleton />
    </>
  );

  return (
    <main className="site-px grid auto-cols-[minmax(26rem,1fr)] grid-flow-col grid-cols-[2fr] gap-x-16 py-16">
      {isLoading && initialCount > 0 ? (
        <Loading />
      ) : cart.length <= 0 ? (
        <EmptyCheckout />
      ) : (
        <>
          <Cart />
          <Payment />
        </>
      )}
    </main>
  );
}
