'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { useCartStore } from '@/providers/cart-store-provider';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Payment() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cart } = useCartStore((state) => state);

  useEffect(() => {
    setIsLoading(false);
  }, [cart]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <aside className="sticky top-2 h-max rounded-md border border-foreground bg-white">
      <header className="border-b border-foreground p-4">
        <div className="font-semibold">Pay with</div>
        <div className="mt-4">
          <div className="flex flex-wrap justify-between">
            <label htmlFor="cc">Card information</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="underline">
                  Use a different card?
                </TooltipTrigger>
                <TooltipContent>
                  Skipped — irrelevant for the challenge
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="mt-2 flex w-full items-center justify-between rounded-md border border-foreground bg-background px-4 py-3">
              <div className="flex gap-x-2">
                <CreditCard className="h-5 w-5 opacity-50" />
                <div>**** **** **** 9999</div>
              </div>
              <div>01/28</div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-y-4 border-b border-foreground p-4">
        <strong>Contact information</strong>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email address</label>
          <Input
            id="email"
            className="bg-white"
            defaultValue="niklas@schoenberger.dev"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="country">Country</label>
          <Select defaultValue="AT">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AT">Austria</SelectItem>
              <SelectItem value="ES">Spain</SelectItem>
              <SelectItem value="US">United States</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="vat">Business VAT ID (optional)</label>
          <Input
            id="vat"
            className="bg-white"
            placeholder="Business VAT ID (optional)"
          />
        </div>
      </div>
      <div className="p-4">
        <Button className="gumroad-hover w-full bg-foreground text-background before:bg-foreground hover:text-foreground hover:before:bg-primary">
          <span>Pay</span>
        </Button>
      </div>
    </aside>
  );
}
