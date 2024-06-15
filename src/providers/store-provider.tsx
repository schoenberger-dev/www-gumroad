import React, { ReactNode } from 'react';
import { CartStoreProvider } from './cart-store-provider';
// import { DiscoverStoreProvider } from './discover-store-provider';

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <CartStoreProvider>{children}</CartStoreProvider>
);

export default StoreProvider;
