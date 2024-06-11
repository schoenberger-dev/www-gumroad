import API from './api';

export async function getAll(): Promise<Product[]> {
  try {
    const res = await API.GET('products', {
      cache: 'no-store',
    });

    return await res.json();
  } catch (error: any) {
    console.error('Could not fetch products', error);
    throw new Error(error);
  }
}
