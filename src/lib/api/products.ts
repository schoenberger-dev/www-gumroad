'use server';

import { API } from './api';

export async function getAll(): Promise<Product[]> {
  const res = await API.GET('products', {
    cache: 'no-store',
  });

  return await res.json();
}

export async function search(query: string): Promise<SearchResults> {
  const res = await API.GET(`products/search?q=${query}`, {
    cache: 'no-store',
  });

  console.log(res.statusText);

  const { products, categories, artists } = await res.json();
  // console.log({ products, categories, artists });

  return { products, categories, artists };
}
