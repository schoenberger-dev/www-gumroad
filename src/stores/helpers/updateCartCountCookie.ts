import Cookies from 'js-cookie';

export function updateCartCountCookie(count: number) {
  Cookies.set('cart_count', JSON.stringify(count), { expires: 7 });
}
