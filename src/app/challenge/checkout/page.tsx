import { Checkout } from '@/components/challenge/checkout';
import { Header } from '@/components/challenge/checkout/layout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function Page() {
  const cartCount = Number(cookies().get('cart_count')?.value ?? 0);

  return (
    <div className="flex flex-col gap-y-1">
      <Header />
      <Checkout initialCount={cartCount} />
    </div>
  );
}
