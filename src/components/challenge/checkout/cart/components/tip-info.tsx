'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCartStore } from '@/providers/cart-store-provider';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Info } from 'lucide-react';

type Props = {
  scrollToArtist: (artist: string) => void;
};

export function TipInfo({ scrollToArtist }: Props) {
  const isTablet = useMediaQuery('only screen and (min-width : 768px)');
  const { tips } = useCartStore((state) => state);

  const content = (
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
  );

  const DesktopLayout = (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="relative -top-0.5">
          <Info className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const MobileLayout = (
    <Popover>
      <PopoverTrigger className="relative -top-0.5">
        <Info className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="w-max p-3" side="top">
        {content}
      </PopoverContent>
    </Popover>
  );

  return isTablet ? DesktopLayout : MobileLayout;
}
