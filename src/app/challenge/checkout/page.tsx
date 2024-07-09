import { Checkout } from '@/components/challenge/checkout';
import { Header } from '@/components/challenge/checkout/layout';
import { getByArtists } from '@/lib/api';
import { cookies } from 'next/headers';

export default async function Page() {
  const cartCount = Number(cookies().get('cart_count')?.value ?? 0);

  const cartArtists = JSON.parse(cookies().get('cart_artists')?.value ?? '[]');
  const cartProducts = JSON.parse(
    cookies().get('cart_products')?.value ?? '[]',
  );

  const artistsUpsells = await getByArtists(cartArtists, cartProducts);

  return (
    <div className="flex flex-col gap-y-1">
      <Header />
      <Checkout initialCount={cartCount} upsells={artistsUpsells} />
    </div>
  );
}
