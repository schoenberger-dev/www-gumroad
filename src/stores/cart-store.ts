import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type CartState = {
  cart: CartProduct[];
};

export type CartActions = {
  addToCart: (product: Product) => void;
  setQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  deleteFromCart: (product: Product) => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
  return { cart: [] };
};

export const defaultInitState: CartState = {
  cart: [],
};

const updateCartCountCookie = (count: number) => {
  Cookies.set('cart_count', JSON.stringify(count), { expires: 7 });
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
        removeFromCart: (product) =>
          set((state) => {
            const cart = [...state.cart];
            const productIndex = cart.findIndex(
              (item) => item.id === product.id,
            );
            if (productIndex !== -1) {
              cart[productIndex].quantity -= 1;
              if (cart[productIndex].quantity === 0) {
                cart.splice(productIndex, 1);
              }
            }

            updateCartCountCookie(cart.length);
            return { cart: [...cart] };
          }),
        deleteFromCart: (product) =>
          set((state) => {
            const cart = [...state.cart];
            const updatedCart = cart.filter((item) => item.id !== product.id);
            updateCartCountCookie(updatedCart.length);
            return { cart: [...updatedCart] };
          }),
      }),
      { name: 'cart' },
    ),
  );
};
