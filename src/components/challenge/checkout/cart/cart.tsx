'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CartProductGroup } from './components';
import { useCartStore } from '@/providers/cart-store-provider';
import { AnimatedNumber } from '@/components/partials';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { useMediaQuery } from '@uidotdev/usehooks';

export function Cart() {
  const isTablet = useMediaQuery('only screen and (min-width : 768px)');
  const { cart, tips, getItemsByArtists } = useCartStore((state) => state);

  const [tipInfoOpen, setTipInfoOpen] = useState<boolean>(false);

  const productsByArtist = getItemsByArtists();

  const [subtotal, setSubtotal] = useState<string>('0');
  const [tipsTotal, setTipsTotal] = useState<string>('0');
  const [vat, setVat] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');

  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSubtotal(subtotal.toFixed(2));

    const vat = subtotal * 0.2;
    setVat(vat.toFixed(2));

    const tipsTotal = tips.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0,
    );
    setTipsTotal(tipsTotal.toFixed(2));

    const total = subtotal * 1.2 + tipsTotal;
    setTotal(total.toFixed(2));
  }, [cart, tips]);

  const scrollToArtist = (artist: string) => {
    const element = document.getElementById(artist);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-max rounded-md border border-foreground bg-white">
      <div className="flex flex-col">
        {productsByArtist.map((group, index) => (
          <CartProductGroup
            key={`${group.artist.username}-${index}`}
            {...group}
            index={index}
          />
        ))}
      </div>
      <div className="bottom-0 left-0 h-full w-full space-y-4 py-4">
        <AnimatedNumber
          animationKey={`${subtotal}-subtotal`}
          index={0}
          label="Subtotal"
          value={subtotal}
        />
        <AnimatedNumber
          animationKey={`${vat}-vat`}
          index={2}
          label="VAT"
          value={vat}
        />
        <AnimatedNumber
          animationKey={`${tipsTotal}-tips`}
          index={1}
          label="Tips"
          value={tipsTotal}
          tooltip={
            <TooltipProvider>
              <Tooltip
                open={tipInfoOpen}
                onOpenChange={setTipInfoOpen}
                delayDuration={300}
              >
                <TooltipTrigger
                  className="relative -top-0.5"
                  onClick={() => isTablet && setTipInfoOpen(!tipInfoOpen)}
                >
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1 text-sm">
                    {tips.map((i) => (
                      <div
                        key={i.artist.username}
                        className="flex w-full cursor-pointer items-center justify-between gap-x-2"
                        onClick={() => scrollToArtist(i.artist.username)}
                      >
                        {i.artist.name}: <span>€{i.amount}</span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
        />
        <div className="flex justify-between gap-x-4 px-4">
          <Input placeholder="Discount code" className="bg-white" />
          <Button variant="secondary" className="gumroad-hover h-12 bg-white">
            <span>Apply</span>
          </Button>
        </div>
        <hr key="hr" className="border-foreground" />
        <AnimatedNumber
          animationKey={`${total}-total`}
          index={3}
          label="Total"
          value={total}
          className="text-xl"
        />
      </div>
    </div>
  );
}
