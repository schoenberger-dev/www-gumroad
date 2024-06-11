import { Checkout } from '@/components/challenge/checkout';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col gap-y-1">
      <header className="site-px flex items-center justify-between border-b border-foreground py-8">
        <h1 className="text-4xl">Checkout</h1>
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
      <Checkout />
    </div>
  );
}
