import { unique } from '@/lib/utils';
import Cookies from 'js-cookie';

export function updateCartArtists(artists: Artist[]) {
  const ids = unique(artists.map((i) => i.id));

  Cookies.set('cart_artists', JSON.stringify(ids), {
    expires: 7,
  });
}
