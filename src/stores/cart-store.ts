import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { updateCartCountCookie } from './helpers';

type CartProductsByArtist = {
  artist: Artist;
  items: CartProduct[];
};

export type CartState = {
  cart: CartProduct[];
  tips: { artist: Artist; amount: string }[];
};

export type CartActions = {
  artistTip: (artist: string) => string;
  getItemsByArtists: () => CartProductsByArtist[];
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

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        getItemsByArtists: () =>
          get().cart.reduce((acc: CartProductsByArtist[], product) => {
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

            updateCartCountCookie(updatedCart.length);
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
            updateCartCountCookie(updatedCart.length);
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

            return { tips };
          }),
      }),
      { name: 'cart' },
    ),
  );
};
