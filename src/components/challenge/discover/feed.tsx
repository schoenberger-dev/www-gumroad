'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { imageUrl } from '@/lib/utils';
import { useStore } from '@/providers/store-provider';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Feed({ products }: { products: Product[] }) {
  const { addToCart } = useStore();

  return (
    <section className="site-px md:py-16">
      <div className="grid-cols-feed grid gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="gumroad-hover z-[1] grid h-full grid-rows-[auto_1fr_auto] p-0"
          >
            <Link
              href={`/challenge/${product.artist.username}/${product.id}`}
              className="relative aspect-square"
            >
              <Image
                src={imageUrl(product.image)}
                width={140}
                height={140}
                alt={`Product Image for ${product.name}`}
                className="absolute left-0 top-0 h-full w-full rounded-t-md object-cover"
              />
            </Link>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-1.5">
                <div className="block h-5 w-5 rounded-full border border-neutral-500 bg-primary"></div>
                <div className="text-sm text-neutral-400">
                  {product.artist.name}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                size="icon"
                className="ml-auto h-8 w-8 hover:bg-primary"
                onClick={() => addToCart(product)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
