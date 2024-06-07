'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Cart({ items }: { items: Product[] }) {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);

  useEffect(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(subtotal);
    const vat = subtotal * 0.2;
    setVat(vat);
    const total = subtotal * 1.2;
    setTotal(total);
  }, [items]);

  return (
    <div className="h-max rounded-md border border-foreground bg-white">
      {items.map(({ title, artist, price, qty, image }, index) => (
        <div className="grid grid-cols-[140px_1fr] border-b border-foreground last:border-none">
          <Image
            src={image}
            width={140}
            height={140}
            alt={`Product Image ${index}`}
            className={`${index === 0 ? 'rounded-tl-md' : ''} border-r border-foreground`}
          />
          <div className="flex flex-col justify-between p-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <a href="">
                  <strong className="underline">{title}</strong>
                </a>
                <a href="">
                  <span className="text-sm underline">{artist}</span>
                </a>
              </div>
              <div>US${price}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <strong>Qty:</strong> <span>{qty}</span>
              </div>
              <a href="" className="underline">
                Remove
              </a>
            </div>
          </div>
        </div>
      ))}
      <div className="space-y-4 p-4">
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div>US${subtotal}</div>
        </div>
        <div className="flex justify-between">
          <div>VAT</div>
          <div>US${vat}</div>
        </div>
        <div className="flex justify-between gap-x-4">
          <Input placeholder="Discount code" className="bg-white" />
          <Button variant="secondary" className="bg-white">
            Apply
          </Button>
        </div>
      </div>
      <div className="border-t border-foreground">
        <div className="flex justify-between p-4 text-xl">
          <div>Total</div>
          <div>US${total}</div>
        </div>
      </div>
    </div>
  );
}
