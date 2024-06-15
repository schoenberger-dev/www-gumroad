'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import easings from '@/lib/ui/easings';
import { Search } from '@/components/challenge/discover/components/search';

export function Header() {
  const { cart } = useCartStore((state) => state);
  const [displayCount, setDisplayCount] = useState(cart.length);

  useEffect(() => {
    setDisplayCount(cart.length);
  }, [cart]);

  return (
    <header className="site-px sticky top-0 z-10 grid border-b border-neutral-300 bg-background/90 py-6 backdrop-blur md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4">
      <h1 className="small-caps h-max text-4xl font-bold leading-[1ch]">
        gumroad
      </h1>
      <Search />
      <Link
        href="/challenge/checkout"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'gumroad-hover flex h-12 items-center gap-x-1.5',
        )}
      >
        <ShoppingCart className="relative h-5 w-5" />
        <div
          data-count={displayCount}
          className="relative h-6 w-max overflow-hidden text-base font-semibold before:opacity-0 before:content-[attr(data-count)]"
        >
          <AnimatePresence>
            <motion.span
              key={displayCount}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: easings.OutBack }}
              className="absolute left-0 top-0"
            >
              {displayCount}
            </motion.span>
          </AnimatePresence>
        </div>
      </Link>
    </header>
  );
}
