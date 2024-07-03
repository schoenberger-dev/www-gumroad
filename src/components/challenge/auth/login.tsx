'use client';

import { signIn } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/providers/auth-store-provider';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export type LoginForm = {
  username: string;
  password: string;
};

export function Login() {
  const { saveToken } = useAuthStore((state) => state);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginForm>();
  const submit: () => void = handleSubmit(async (data) => {
    const { token } = await signIn(data);

    saveToken(token);
    router.push('/challenge/discover');
  });

  return (
    <form onSubmit={submit} className="relative -top-16 w-full space-y-8">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="username">Username</label>
        <Input {...register('username')} placeholder="uname" />
        {errors.username && (
          <span className="text-xs text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <Input {...register('password')} placeholder="*****" type="password" />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button disabled={isLoading} className="gumroad-hover:primary w-full">
        <span>Login</span>
      </Button>
    </form>
  );
}
