'use client';

import { useCartStore } from '@/providers/cart-store-provider';
import { useEffect, useState } from 'react';
import { Cart, CartSkeleton, Upsells } from './cart';
import { Payment, PaymentSkeleton } from './payment';
import { EmptyCheckout } from './components';
import { updateCartCountCookie } from '@/stores/helpers';

type Props = {
  initialCount: number;
  upsells: ProductsByArtist[];
};

export function Checkout({ initialCount, upsells }: Props) {
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
    <main className="site-px grid gap-x-16 gap-y-8 py-4 lg:auto-cols-[minmax(26rem,1fr)] lg:grid-flow-col lg:grid-cols-[2fr] lg:py-16">
      {isLoading && initialCount > 0 ? (
        <Loading />
      ) : cart.length <= 0 ? (
        <EmptyCheckout />
      ) : (
        <>
          <Cart />
          <div className="row-start-2 w-full">
            <Upsells upsells={upsells} />
          </div>
          <Payment />
        </>
      )}
    </main>
  );
}
