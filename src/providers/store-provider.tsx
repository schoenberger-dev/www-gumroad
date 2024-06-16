import React, { ReactNode } from 'react';
import { AuthStoreProvider } from './auth-store-provider';
import { CartStoreProvider } from './cart-store-provider';
// import { DiscoverStoreProvider } from './discover-store-provider';

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <AuthStoreProvider>
    <CartStoreProvider>{children}</CartStoreProvider>
  </AuthStoreProvider>
);

export default StoreProvider;
