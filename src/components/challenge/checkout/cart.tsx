'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { imageUrl } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Cart({ products }: { products: Product[] }) {
  const [subtotal, setSubtotal] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');
  const [vat, setVat] = useState<string>('0');

  const { removeFromCart } = useCartStore((state) => state);

  useEffect(() => {
    const subtotal = products.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(subtotal.toFixed(2));
    const vat = subtotal * 0.2;
    setVat(vat.toFixed(2));
    const total = subtotal * 1.2;
    setTotal(total.toFixed(2));
  }, [products]);

  console.log(products);

  return (
    <div className="h-max rounded-md border border-foreground bg-white">
      {products.map((product, index) => (
        <div
          key={index}
          className="grid grid-cols-[140px_1fr] border-b border-foreground last:border-none"
        >
          <Image
            src={imageUrl(product.image)}
            width={140}
            height={140}
            alt={`Product Image ${index}`}
            className={`${index === 0 ? 'rounded-tl-md' : ''} border-r border-foreground`}
          />
          <div className="flex flex-col justify-between p-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <a href="">
                  <strong className="underline">{product.name}</strong>
                </a>
                <a href="">
                  <span className="text-sm underline">
                    {product.artist.name}
                  </span>
                </a>
              </div>
              <div>US${product.price}</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <strong>Qty:</strong> <span>{1}</span>
              </div>
              <Button
                variant="link"
                onClick={() => removeFromCart(product)}
                className="h-max p-1 text-foreground underline"
              >
                Remove
              </Button>
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
