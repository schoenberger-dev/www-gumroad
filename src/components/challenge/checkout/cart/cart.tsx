'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CartProduct } from './components/';
import { useCartStore } from '@/providers/cart-store-provider';

export function Cart() {
  const { cart } = useCartStore((state) => state);

  const [subtotal, setSubtotal] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');
  const [vat, setVat] = useState<string>('0');

  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSubtotal(subtotal.toFixed(2));
    const vat = subtotal * 0.2;
    setVat(vat.toFixed(2));
    const total = subtotal * 1.2;
    setTotal(total.toFixed(2));
  }, [cart]);

  return (
    <div className="h-max rounded-md border border-foreground bg-white">
      {cart.map((product, index) => (
        <CartProduct key={product.id} product={product} index={index} />
      ))}
      <div className="space-y-4 p-4">
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div>€{subtotal}</div>
        </div>
        <div className="flex justify-between">
          <div>VAT</div>
          <div>€{vat}</div>
        </div>
        <div className="flex justify-between gap-x-4">
          <Input placeholder="Discount code" className="bg-white" />
          <Button variant="secondary" className="gumroad-hover bg-white">
            <span>Apply</span>
          </Button>
        </div>
      </div>
      <div className="border-t border-foreground">
        <div className="flex justify-between p-4 text-xl">
          <div>Total</div>
          <div>€{total}</div>
        </div>
      </div>
    </div>
  );
}
