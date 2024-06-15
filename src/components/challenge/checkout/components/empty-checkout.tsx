import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function EmptyCheckout() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-foreground bg-white p-8">
      <Image
        src="https://assets.gumroad.com/packs/static/8a6076a4f2863ad9d342.png"
        alt="Gumroad empty cart placeholder image"
        width={1024}
        height={300}
        className="w-full"
      />
      <h2 className="block text-center text-2xl">
        {"You haven't added anything...yet!"}
      </h2>
      <p className="text-sm">
        {"Once you do, it'll show up here so you can complete your purchases."}
      </p>
      <Link
        href="/challenge/discover"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'gumroad-hover:primary w-max',
        )}
      >
        <span>Discover products</span>
      </Link>
    </div>
  );
}
