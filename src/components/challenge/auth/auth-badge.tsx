import { useAuthStore } from '@/providers/auth-store-provider';
import { Fingerprint } from 'lucide-react';

export function AuthBadge() {
  const { token } = useAuthStore((state) => state);

  return (
    !!token && (
      <div className="fixed bottom-0 left-0 z-10 flex w-max items-center gap-x-1 rounded-md border border-foreground/10 bg-background/85 px-2 py-1.5 backdrop-blur md:bottom-4 md:right-28">
        <Fingerprint className="h-4 w-4 text-emerald-400" />{' '}
        <span className="text-xs text-neutral-500">Signed in</span>
      </div>
    )
  );
}
