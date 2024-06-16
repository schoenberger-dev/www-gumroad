import { useAuthStore } from '@/providers/auth-store-provider';
import { Fingerprint } from 'lucide-react';

export function AuthBadge() {
  const { token } = useAuthStore((state) => state);
  // TODO: Logout functionality

  return (
    !!token && (
      <div className="fixed bottom-[23px] left-32 flex w-max items-center gap-x-1">
        <Fingerprint className="h-4 w-4 text-emerald-400" />{' '}
        <span className="text-xs text-neutral-500">Signed in</span>
      </div>
    )
  );
}
