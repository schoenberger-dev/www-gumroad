import { Header } from './layout';
import { Feed } from './feed';

export async function Discover({ products }: { products: Product[] }) {
  return (
    <main>
      <Header />
      <hr className="border-foreground/20" />
      <Feed products={products} />
    </main>
  );
}
