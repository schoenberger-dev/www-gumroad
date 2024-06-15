import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { imageUrl } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';
import Image from 'next/image';
import { useState } from 'react';

export function CartProduct({
  product,
  index,
}: {
  product: CartProduct;
  index: number;
}) {
  const [quantityIsOpen, setQuantityIsOpen] = useState<boolean>(false);
  const { setQuantity, deleteFromCart } = useCartStore((state) => state);

  const [updatedQuantity, setUpdatedQuantity] = useState<number>(
    product.quantity,
  );

  const saveQuantity = () => {
    setQuantity(product, updatedQuantity);
    setQuantityIsOpen(false);
  };

  return (
    <div className="grid grid-cols-[140px_1fr] border-b border-foreground last:border-none">
      <Image
        src={imageUrl(product.image)}
        width={140}
        height={140}
        alt={`${product.name} Product Image`}
        className={`${index === 0 ? 'rounded-tl-sm' : ''} border-r border-foreground`}
      />
      <div className="flex flex-col justify-between p-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <a href="">
              <strong className="underline">{product.name}</strong>
            </a>
            <a href="">
              <span className="text-sm underline">{product.artist.name}</span>
            </a>
          </div>
          <div>€{product.price * product.quantity}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <strong>Qty:</strong> <span>{product.quantity}</span>
          </div>
          <div className="space-x-4">
            <Popover
              open={quantityIsOpen}
              onOpenChange={() => setQuantityIsOpen(!quantityIsOpen)}
            >
              <PopoverTrigger className="before:-translate-x-1/27 relative h-max rounded-md p-1 text-foreground underline before:absolute before:-bottom-1 before:left-[calc(50%-0.25rem)] before:border-[6px] before:border-t-0 before:border-transparent before:border-b-black before:opacity-0 before:transition-opacity before:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:before:opacity-100">
                Configure
              </PopoverTrigger>
              <PopoverContent align="start">
                <label htmlFor={`quantity-${product.id}`}>Quantity</label>
                <Input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(+e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveQuantity()}
                  className="mt-2 bg-white"
                />
                <Button
                  onClick={() => saveQuantity()}
                  className="gumroad-hover:primary mt-4 w-full"
                >
                  <span>Save changes</span>
                </Button>
              </PopoverContent>
            </Popover>
            <Button
              variant="link"
              onClick={() => deleteFromCart(product)}
              className="h-max p-1 text-foreground underline"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
