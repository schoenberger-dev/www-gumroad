'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CartProductGroup } from './components';
import { useCartStore } from '@/providers/cart-store-provider';
import { AnimatedNumber } from '@/components/partials';

export function Cart() {
  const { cart, tips } = useCartStore((state) => state);

  const productsByArtist: { artist: Artist; items: CartProduct[] }[] = [];

  cart.forEach((product) => {
    const artistGroup = productsByArtist.find(
      (i) => i.artist.username === product.artist.username,
    );
    if (!artistGroup)
      productsByArtist.push({ artist: product.artist, items: [product] });
    else artistGroup.items.push(product);
  });

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

    const tipsTotal = tips.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0,
    );
    console.log(tipsTotal);
    setTipsTotal(tipsTotal.toFixed(2));

    const vat = subtotal * 0.2;
    setVat(vat.toFixed(2));

    const total = subtotal * 1.2;
    setTotal(total.toFixed(2));
  }, [cart]);

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
          animationKey={`${tipsTotal}-tips`}
          index={1}
          label="Tips"
          value={tipsTotal}
        />
        <AnimatedNumber
          animationKey={`${vat}-vat`}
          index={2}
          label="VAT"
          value={vat}
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
