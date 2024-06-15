// import { createStore } from 'zustand/vanilla';
// import { persist } from 'zustand/middleware';
// import Cookies from 'js-cookie';
// import { search } from '@/lib/api';

// export type DiscoverState = {
//   results: {
//     products: Product[];
//     categories: ProductCategory[];
//     artists: Artist[];
//   };
// };

// export type DiscoverActions = {
//   search: (query: string) => Promise<void>;
// };

// export type DiscoverStore = DiscoverState & DiscoverActions;

// export const initDiscoverStore = (): DiscoverState => {
//   return { results: { products: [], categories: [], artists: [] } };
// };

// export const defaultInitState: DiscoverState = {
//   results: { products: [], categories: [], artists: [] },
// };

// const updateSearchQueryCookie = (query: string) => {
//   Cookies.set('search_query', JSON.stringify(query), { expires: 7 });
// };

// export const createDiscoverStore = (
//   initState: DiscoverState = defaultInitState,
// ) => {
//   return createStore<DiscoverStore>()((set) => ({
//     ...initState,
//     search: (query) => set(() => ({ results: search(query)})),
//   }));
// };
