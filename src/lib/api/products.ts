'use server';

import { API } from './api';

export async function getAll(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
    {
      method: 'GET',
      headers: { Authorization: `${process.env.API_TOKEN}` },
      cache: 'no-store',
    },
  );

  return await res.json();
}

export async function search(query: string): Promise<SearchResults> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/search?q=${query}`,
    {
      method: 'GET',
      headers: { Authorization: `${process.env.API_TOKEN}` },
      cache: 'no-store',
    },
  );

  console.log(res.statusText);

  const { products, categories, artists } = await res.json();
  // console.log({ products, categories, artists });

  return { products, categories, artists };
}
