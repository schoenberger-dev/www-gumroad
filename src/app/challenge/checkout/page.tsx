import { Checkout } from '@/components/challenge/checkout';
import { Button } from '@/components/ui/button';

export default function Page() {
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
      <Checkout />
    </div>
  );
}
