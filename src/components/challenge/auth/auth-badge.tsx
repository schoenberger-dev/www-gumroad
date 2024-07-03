import { useAuthStore } from '@/providers/auth-store-provider';
import { Fingerprint } from 'lucide-react';

export function AuthBadge() {
  const { token } = useAuthStore((state) => state);

  return (
    !!token && (
      <div className="fixed bottom-4 left-4 flex w-max items-center gap-x-1 rounded-md bg-background/80 px-2 py-1.5 backdrop-blur">
        <Fingerprint className="h-4 w-4 text-emerald-400" />{' '}
        <span className="text-xs text-neutral-500">Signed in</span>
      </div>
    )
  );
}
