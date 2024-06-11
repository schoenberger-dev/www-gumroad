import API from './api';

export async function getAll(): Promise<Product[]> {
  const res = await API.GET('products', {
    cache: 'no-store',
  });

  return await res.json();
}
