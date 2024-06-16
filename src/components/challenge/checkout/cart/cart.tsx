'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CartProduct } from './components/';
import { useCartStore } from '@/providers/cart-store-provider';
import { motion } from 'framer-motion';
import easings from '@/lib/ui/easings';

export function Cart() {
  const { cart } = useCartStore((state) => state);

  const [subtotal, setSubtotal] = useState<string>('0');
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
    const total = subtotal * 1.2;
    setTotal(total.toFixed(2));
  }, [cart]);

  const animationTransition = {
    duration: 0.75,
    delay: 0,
    ease: easings.OutQuad,
  };

  const animationVariants = {
    initial: {
      filter: 'blur(4px)',
      opacity: 0,
      transition: animationTransition,
    },
    animate: (custom: number) => ({
      filter: 'blur(0px)',
      opacity: 1,
      transition: { ...animationTransition, delay: custom * 0.1 },
    }),
    exit: { filter: 'blur(4px)', opacity: 0, transition: animationTransition },
  };

  return (
    <div className="relative h-max rounded-md border border-foreground bg-white">
      {cart.map((product, index) => (
        <CartProduct key={product.id} product={product} index={index} />
      ))}
      <div className="bottom-0 left-0 h-full w-full space-y-4 py-4">
        <motion.div
          key={`${subtotal}-subtotal`}
          custom={0}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants}
          className="flex justify-between px-4"
        >
          <div>Subtotal</div>
          <div>€{subtotal}</div>
        </motion.div>
        <motion.div
          key={`${vat}-vat`}
          custom={1}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants}
          className="flex justify-between px-4"
        >
          <div>VAT</div>
          <div>€{vat}</div>
        </motion.div>
        <div className="flex justify-between gap-x-4 px-4">
          <Input placeholder="Discount code" className="bg-white" />
          <Button variant="secondary" className="gumroad-hover h-12 bg-white">
            <span>Apply</span>
          </Button>
        </div>
        <hr key="hr" className="border-foreground" />
        <motion.div
          key={`${total}-total`}
          custom={2}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants}
          className="flex justify-between px-4 text-xl"
        >
          <div>Total</div>
          <div>€{total}</div>
        </motion.div>
      </div>
    </div>
  );
}
