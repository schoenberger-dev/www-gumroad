import { useEffect, useState } from 'react';
import { CartProduct } from './cart-product';
import { AnimatedNumber } from '@/components/partials';
import { Tip } from './tip';
import { useCartStore } from '@/providers/cart-store-provider';
import { HandCoins, PiggyBank, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  artist: Artist;
  items: CartProduct[];
  index: number;
};

export function CartProductGroup({ artist, items, index }: Props) {
  const { artistTip, setArtistTip } = useCartStore((state) => state);

  const [subtotal, setSubtotal] = useState<string>('0');

  const [isOpen, setOpen] = useState<boolean>(false);

  const tip = parseFloat(artistTip(artist.username));

  useEffect(() => {
    const value = items.reduce(
      (acc, item) => tip + acc + item.price * item.quantity,
      0,
    );
    setSubtotal(value.toFixed(2));
  }, [items, artistTip]);

  const handleTip = (amount: string) => {
    setArtistTip(artist, amount);
    setOpen(false);
  };

  return (
    <div
      id={artist.username}
      key={artist.username}
      className="flex flex-col space-y-2 border-b border-foreground/70 py-2 md:space-y-3 md:py-4"
    >
      <div className="px-4 font-semibold leading-tight md:text-lg">
        {artist.name}
      </div>
      <div className="space-y-2 px-4 md:px-8">
        {items.map((product) => (
          <CartProduct key={product.id} product={product} index={index} />
        ))}
      </div>
      <details
        className="flex gap-x-4 border-t px-4 pt-2 text-sm md:px-8 md:pt-4"
        open={isOpen}
      >
        <summary className="relative w-max" tabIndex={-1}>
          <Button
            variant="link"
            className={cn(
              'inline-flex h-max items-center gap-x-1.5 p-1',
              isOpen && 'bg-background decoration-primary',
            )}
            onClick={() => setOpen(!isOpen)}
          >
            <HandCoins
              strokeWidth={1.5}
              className={cn(
                'h-4 w-4 transition-colors',
                isOpen && 'text-primary-700',
              )}
            />
            {tip > 0 ? 'Change' : 'Add'} tip
          </Button>
          {tip > 0 && (
            <Button
              variant="link"
              className="ml-4 inline-flex h-max items-center gap-x-1.5 p-1"
              onClick={() => setArtistTip(artist, '0')}
            >
              <PiggyBank className="h-4 w-4" strokeWidth={1.5} />
              Remove tip
            </Button>
          )}
        </summary>
        <div className="mt-2 w-full">
          <Tip value={tip} onChange={handleTip} visible={isOpen} />
        </div>
      </details>
      {tip > 0 && (
        <div className="px-4 text-sm text-neutral-600 md:px-8">
          <AnimatedNumber
            animationKey={`${index}-${tip}-${artist.username}`}
            label="Tip"
            value={tip}
            className="px-0"
          />
        </div>
      )}
      <div className="border-t px-4 pt-2 text-sm text-neutral-600 md:px-8 md:pt-4">
        <AnimatedNumber
          animationKey={`${index}-${subtotal}-${artist.username}`}
          label="Subtotal"
          value={subtotal}
          className="px-0"
        />
      </div>
    </div>
  );
}
