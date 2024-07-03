import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { updateCartCountCookie } from './helpers';

export type CartState = {
  cart: CartProduct[];
  tips: { artist: string; amount: string }[];
};

export type CartActions = {
  addToCart: (product: Product) => void;
  setQuantity: (product: Product, quantity: number) => void;
  deleteFromCart: (product: Product) => void;
  setArtistTip: (artist: string, amount: string) => void;
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
      (set) => ({
        ...initState,
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
            console.log(artist, amount);
            return {
              tips: state.tips.map((item) =>
                item.artist === artist ? { artist, amount } : item,
              ),
            };
          }),
      }),
      { name: 'cart' },
    ),
  );
};
