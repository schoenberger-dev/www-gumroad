'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/utils';
import Avvvatars from 'avvvatars-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/providers/cart-store-provider';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore((state) => state);

  return (
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
      <Link
        href={`/challenge/${product.artist.username}/${product.id}`}
        className="p-4"
      >
        <CardHeader className="space-y-0 p-0">
          <CardTitle className="text-lg font-medium leading-tight">
            {product.name}
          </CardTitle>
          <CardDescription className="mt-0">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent className="p-4 pt-0">
        <Link
          href={`/challenge/artist/${product.artist.username}`}
          className="group inline-flex items-center gap-x-1.5 rounded-md border border-transparent px-1 py-0.5 pl-0 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:underline"
        >
          <Avvvatars
            style="shape"
            value={product.artist.name}
            size={22}
            borderColor="#737373"
            border
            borderSize={1}
          />
          {product.artist.name}
        </Link>
      </CardContent>
      <CardFooter className="border-t border-foreground p-4">
        <Badge
          variant="secondary"
          className="h-full rounded-none border-r-0 border-foreground"
        >
          €{product.price}
        </Badge>
        <Button
          className="w-full rounded-none border border-l-0 border-foreground bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
