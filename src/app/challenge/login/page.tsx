import { Login } from '@/components/challenge/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const token = cookies().get('token')?.value;

  if (!!token) redirect('/challenge/discover');

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-80 items-center justify-center">
      <Login />
    </div>
  );
}
