import API from './api';

export async function getAll(): Promise<Product[]> {
  const res = await API.GET(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
    {
      cache: 'no-store',
    },
  );

  return await res.json();
}
