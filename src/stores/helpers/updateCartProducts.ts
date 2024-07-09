import { unique } from '@/lib/utils';
import Cookies from 'js-cookie';

export function updateCartProducts(products: Product[]) {
  const ids = unique(products.map((i) => i.id));

  Cookies.set('cart_products', JSON.stringify(ids), {
    expires: 7,
  });
}
