import { imageUrl } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

type SearchResultItemProps = {
  item: Product | Artist | ProductCategory;
  type: 'product' | 'artist' | 'category';
};

const ProductItem = ({ product }: { product: Product }) => {
  const url = `discover/product/${product.artist.username}/${product.id}`;
  return (
    <a
      href={`/challenge/${url}`}
      role="option"
      className="flex items-center gap-x-4 px-4 py-2 hover:bg-foreground hover:text-background"
    >
      <Image
        src={imageUrl(product.image)}
        width={48}
        height={48}
        alt={`${product.name} Product Image`}
        className="rounded-md border border-foreground"
      />
      {product.name}
    </a>
  );
};

const CategoryItem = ({ category }: { category: ProductCategory }) => {
  const url = `discover/category/${category.slug}`;
  return (
    <a
      href={`/challenge/${url}`}
      role="option"
      className="flex items-center gap-x-4 px-4 py-2 hover:bg-foreground hover:text-background"
    >
      {category.name}
    </a>
  );
};

const ArtistItem = ({ artist }: { artist: Artist }) => {
  const url = `discover/artist/${artist.username}`;
  return (
    <a
      href={`/challenge/${url}`}
      role="option"
      className="flex items-center gap-x-4 px-4 py-2 hover:bg-foreground hover:text-background"
    >
      {artist.name}
    </a>
  );
};

export function SearchResultItem({ item, type }: SearchResultItemProps) {
  switch (type) {
    case 'product':
      return <ProductItem product={item as Product} />;
    case 'artist':
      return <ArtistItem artist={item as Artist} />;
    case 'category':
      return <CategoryItem category={item as ProductCategory} />;
  }
}
