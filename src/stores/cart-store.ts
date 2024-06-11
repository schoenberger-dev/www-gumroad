import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export type CartState = {
  cart: Product[];
};

export type CartActions = {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
  return { cart: [] };
};

export const defaultInitState: CartState = {
  cart: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,
        addToCart: (product) =>
          set((state) => {
            state.cart.push(product);
            return { cart: state.cart };
          }),
        removeFromCart: (product) =>
          set((state) => {
            return { cart: state.cart.filter((i) => i.id !== product.id) };
          }),
      }),
      { name: 'cart' },
    ),
  );
};
