import { Checkout } from '@/components/challenge/checkout';
import { Button } from '@/components/ui/button';

export default function Page() {
  const cart = [
    {
      title: 'Product Title 1',
      artist: 'Artist',
      price: 60,
      qty: 1,
      image: 'https://source.unsplash.com/random/300x300/?3d',
    },
    {
      title: 'Product Title 2',
      artist: 'Artist 2',
      price: 35,
      qty: 1,
      image: 'https://source.unsplash.com/random/300x300/?cinematic',
    },
  ];

  return (
    <div className="flex flex-col gap-y-1">
      <header className="site-px flex items-center justify-between border-b border-foreground py-8">
        <h1 className="text-4xl">Checkout</h1>
        <Button
          variant="secondary"
          className="gumroad-hover before:bg-background"
        >
          <span>Continue shopping</span>
        </Button>
      </header>
      <Checkout cart={cart} />
    </div>
  );
}
