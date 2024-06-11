import API from './api';

export async function getAll(): Promise<Product[]> {
  try {
    const res = await API.GET(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
      {
        cache: 'no-store',
      },
    );

    return await res.json();
  } catch (error: any) {
    console.error('Could not fetch products', error);
    throw new Error(error);
  }
}
