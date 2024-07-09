'use client';

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
import { motion } from 'framer-motion';
import easings from '@/lib/ui/easings';
import { useMediaQuery } from '@uidotdev/usehooks';

export function CartProduct({
  product,
  index,
}: {
  product: CartProduct;
  index: number;
}) {
  const isTablet = useMediaQuery('only screen and (min-width : 768px)');
  const [quantityIsOpen, setQuantityIsOpen] = useState<boolean>(false);
  const { setQuantity, deleteFromCart } = useCartStore((state) => state);

  const [updatedQuantity, setUpdatedQuantity] = useState<number>(
    product.quantity,
  );

  const saveQuantity = () => {
    if (updatedQuantity === 0) deleteFromCart(product);
    else setQuantity(product, updatedQuantity);
    setQuantityIsOpen(false);
  };

  const animationTransition = {
    duration: 0.5,
    delay: 0,
    ease: easings.OutQuad,
  };

  const animationVariants = {
    initial: {
      filter: 'blur(4px)',
      opacity: 0,
      transition: animationTransition,
    },
    animate: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: animationTransition,
    },
    exit: { filter: 'blur(4px)', opacity: 0, transition: animationTransition },
  };

  return (
    <div className="grid grid-cols-[56px_1fr] gap-x-3 md:grid-cols-[140px_1fr] md:gap-x-4">
      <Image
        src={imageUrl(product.image)}
        width={140}
        height={140}
        alt={`${product.name} Product Image`}
        className="rounded-md md:rounded-none"
      />
      <div className="flex flex-col justify-between pr-0 md:py-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <a href="">
              <strong className="underline">{product.name}</strong>
            </a>
            <a href="">
              <span className="text-sm underline">{product.artist.name}</span>
            </a>
          </div>
          <motion.div
            key={`${product.price}-${product.quantity}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            className="flex items-center"
          >
            €{product.price * product.quantity}
          </motion.div>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm md:p-0">
          <div>
            <strong>Qty:</strong> <span>{product.quantity}</span>
          </div>
          <div className="space-x-2 md:space-x-4">
            <Popover
              open={quantityIsOpen}
              onOpenChange={() => setQuantityIsOpen(!quantityIsOpen)}
            >
              <PopoverTrigger asChild>
                <Button variant="link" className="relative h-max p-1">
                  Configure
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align={isTablet ? 'start' : 'center'}
                className="max-w-52 md:max-w-none"
              >
                <label
                  htmlFor={`quantity-${product.id}`}
                  className="text-sm md:text-base"
                >
                  Quantity
                </label>
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
              className="h-max p-1"
              onClick={() => deleteFromCart(product)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
