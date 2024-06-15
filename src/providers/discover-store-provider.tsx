// 'use client';

// import { type ReactNode, createContext, useRef, useContext } from 'react';
// import { type StoreApi, useStore } from 'zustand';

// import {
//   type DiscoverStore,
//   createDiscoverStore,
//   initDiscoverStore,
// } from '@/stores/discover-store';

// export const DiscoverStoreContext =
//   createContext<StoreApi<DiscoverStore> | null>(null);

// export interface DiscoverStoreProviderProps {
//   children: ReactNode;
// }

// export const DiscoverStoreProvider = ({
//   children,
// }: DiscoverStoreProviderProps) => {
//   const storeRef = useRef<StoreApi<DiscoverStore>>();
//   if (!storeRef.current) {
//     storeRef.current = createDiscoverStore(initDiscoverStore());
//   }

//   return (
//     <DiscoverStoreContext.Provider value={storeRef.current}>
//       {children}
//     </DiscoverStoreContext.Provider>
//   );
// };

// export const useDiscoverStore = <T,>(
//   selector: (store: DiscoverStore) => T,
// ): T => {
//   const discoverStoreContext = useContext(DiscoverStoreContext);

//   if (!discoverStoreContext) {
//     throw new Error(
//       `useDiscoverStore must be use within DiscoverStoreProvider`,
//     );
//   }

//   return useStore(discoverStoreContext, selector);
// };
