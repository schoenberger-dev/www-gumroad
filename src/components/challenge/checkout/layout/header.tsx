'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <header className="site-px flex items-center justify-between border-b border-foreground py-8">
      <h1 className="relative text-3xl md:text-4xl">
        <span>Checkout</span>
      </h1>
      <Link
        href="/challenge/discover"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'gumroad-hover before:bg-background',
        )}
      >
        <span>Continue shopping</span>
      </Link>
    </header>
  );
}
