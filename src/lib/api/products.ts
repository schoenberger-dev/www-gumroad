export async function getAll(): Promise<Product[]> {
  try {
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    return await res.json();
  } catch (error: any) {
    console.error('Could not fetch products', error);
    throw new Error(error);
  }
}
