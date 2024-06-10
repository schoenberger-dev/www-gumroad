'use client';

import useArrayState from '@/lib/hooks/useArrayState';
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

export const StoreContext = createContext<{
  cart: Product[];
  addToCart: (product: Product) => void;
} | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [cart, setCart, toggleCartItem] = useArrayState<Product>([]);

  const addToCart = useCallback((product: Product) => {
    toggleCartItem(product);
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
    }),
    [cart],
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
};
