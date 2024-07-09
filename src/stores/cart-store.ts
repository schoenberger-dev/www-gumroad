import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { updateCartCountCookie } from './helpers';
import { updateCartArtists } from './helpers/updateCartArtists';
import { unique } from '@/lib/utils';
import { updateCartProducts } from './helpers/updateCartProducts';

type ArtistsCartProducts = {
  artist: Artist;
  items: CartProduct[];
};

export type CartState = {
  cart: CartProduct[];
  tips: { artist: Artist; amount: string }[];
};

export type CartActions = {
  artistTip: (artist: string) => string;
  getItemsByArtists: () => ArtistsCartProducts[];
  addToCart: (product: Product) => void;
  setQuantity: (product: Product, quantity: number) => void;
  deleteFromCart: (product: Product) => void;
  setArtistTip: (artist: Artist, amount: string) => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
  return { cart: [], tips: [] };
};

export const defaultInitState: CartState = {
  cart: [],
  tips: [],
};

const handleCookies = (updatedCart: CartProduct[]) => {
  updateCartCountCookie(updatedCart.length);
  updateCartArtists(updatedCart.map((item) => item.artist));
  updateCartProducts(updatedCart.map((item) => item));
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        getItemsByArtists: () =>
          get().cart.reduce((acc: ArtistsCartProducts[], product) => {
            const artistGroup = acc.find(
              (i) => i.artist.username === product.artist.username,
            );
            if (artistGroup) {
              artistGroup.items.push(product);
            } else {
              acc.push({ artist: product.artist, items: [product] });
            }
            return acc;
          }, []),
        artistTip: (artist) =>
          get().tips.find((i) => i.artist.username === artist)?.amount ?? '0',
        addToCart: (product) =>
          set((state) => {
            const cart = [...state.cart];
            const productIndex = cart.findIndex(
              (item) => item.id === product.id,
            );
            if (productIndex !== -1) {
              cart[productIndex].quantity += 1;
              return { cart: [...cart] };
            }

            const updatedCart = [...cart, { ...product, quantity: 1 }];

            handleCookies(updatedCart);

            return { cart: [...cart, { ...product, quantity: 1 }] };
          }),
        setQuantity: (product, quantity) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity } : item,
            ),
          })),
        deleteFromCart: (product) =>
          set((state) => {
            const cart = [...state.cart];
            const updatedCart = cart.filter((item) => item.id !== product.id);

            handleCookies(updatedCart);

            return { cart: [...updatedCart] };
          }),
        setArtistTip: (artist, amount) =>
          set((state) => {
            let tips = [...state.tips];

            const artistIndex = tips.findIndex(
              (item) => item.artist.username === artist.username,
            );

            if (artistIndex >= 0) {
              tips[artistIndex] = { artist, amount };
            } else {
              tips.push({ artist, amount });
            }

            if (amount === '0') {
              if (artistIndex >= 0) tips.splice(artistIndex, 1);
              else tips.splice(tips.length - 1, 1);
            }

            return { tips };
          }),
      }),
      { name: 'cart' },
    ),
  );
};
