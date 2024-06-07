import { Cart, Payment } from './';

export function Checkout({ cart }: { cart: Product[] }) {
  return (
    <main className="site-px grid auto-cols-[minmax(26rem,1fr)] grid-flow-col grid-cols-[2fr] gap-x-16 py-16">
      <Cart items={cart} />
      <Payment />
    </main>
  );
}
