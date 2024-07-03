import { useEffect, useState } from 'react';
import { CartProduct } from './cart-product';
import { AnimatedNumber } from '@/components/partials';
import { Tip } from './tip';
import { useCartStore } from '@/providers/cart-store-provider';

type Props = {
  artist: Artist;
  items: CartProduct[];
  index: number;
};

export function CartProductGroup({ artist, items, index }: Props) {
  const { setArtistTip } = useCartStore((state) => state);

  const [subtotal, setSubtotal] = useState<string>('0');

  useEffect(() => {
    const value = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSubtotal(value.toFixed(2));
  }, [items]);

  const handleTip = (amount: string) => {
    setArtistTip(artist.username, amount);
  };

  return (
    <div
      key={artist.username}
      className="flex flex-col gap-y-2 border-b border-foreground py-4"
    >
      <div className="px-4 font-semibold">{artist.name}</div>
      <div className="space-y-2 px-8">
        {items.map((product) => (
          <CartProduct key={product.id} product={product} index={index} />
        ))}
      </div>
      {/* TODO: make subtotal + tip collapsible -> shadcn */}
      <div className="mt-2 space-y-4 border-t px-8 pt-2">
        <div className="">
          <Tip onChange={handleTip} />
        </div>
      </div>
      <div className="mt-2 space-y-4 border-t px-8 pt-4 text-neutral-400">
        <AnimatedNumber
          animationKey={`${index}-${subtotal}-${artist.username}`}
          label="Total"
          value={subtotal}
          className="px-0 font-semibold"
        />
      </div>
    </div>
  );
}
