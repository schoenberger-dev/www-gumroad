'use client';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { cart } = useCartStore((state) => state);
  console.log(cart);

  return (
    <header className="site-px grid py-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4">
      <h1 className="small-caps h-max text-4xl font-bold leading-[1ch]">
        gumroad
      </h1>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products" className="bg-white pl-10" />
      </div>
      <Link
        href="/challenge/checkout"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'gumroad-hover flex items-center gap-x-1.5',
        )}
      >
        <ShoppingCart className="relative h-5 w-5" />
        <span className="text-base font-semibold">{cart.length}</span>
      </Link>
    </header>
  );
}
