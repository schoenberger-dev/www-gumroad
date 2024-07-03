import { LoginForm } from '@/components/challenge/auth';

export async function signIn(data: LoginForm): Promise<{ token: string }> {
  try {
    const { username, password } = data;
    console.log(username, password);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      console.error(res.statusText);
    }

    return await res.json();
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to login', error);
  }
}
