import { Checkout } from '@/components/challenge/checkout';
import { Header } from '@/components/challenge/checkout/layout';
import { cookies } from 'next/headers';

export default function Page() {
  const cartCount = Number(cookies().get('cart_count')?.value ?? 0);

  return (
    <div className="flex flex-col gap-y-1">
      <Header />
      <Checkout initialCount={cartCount} />
    </div>
  );
}
