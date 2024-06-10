import { Discover } from '@/components/challenge/discover';
import { getAll } from '@/lib/api/products';

export default async function Page() {
  const products = await getAll();
  return <Discover products={products} />;
}
