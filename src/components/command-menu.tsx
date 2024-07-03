'use client';

import * as React from 'react';
import { LogIn, CreditCard, Settings, User, LogOut } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/providers/auth-store-provider';

export function CommandMenu() {
  const { token, deleteToken } = useAuthStore((state) => state);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 w-max">
        <div className="text-foreground/50" onClick={() => setOpen(true)}>
          <Button
            variant="secondary"
            className="h-max cursor-pointer border-foreground/10 py-1.5 text-xs text-foreground/35 hover:border-primary-300 hover:text-foreground/75"
          >
            Press &#8984;+K
          </Button>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Auth">
            {!!token ? (
              <CommandItem
                onSelect={() => {
                  deleteToken();
                  setOpen(false);
                  // TODO: toast.success({ message: 'Successfully logged out' })
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </CommandItem>
            ) : (
              <CommandItem
                onSelect={() => {
                  router.push('/challenge/login');
                  setOpen(false);
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => {
                router.push('/challenge/discover');
                setOpen(false);
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Discover</span>
              {/* <CommandShortcut>⌘P</CommandShortcut> */}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/challenge/checkout');
                setOpen(false);
              }}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Checkout</span>
              {/* <CommandShortcut>⌘B</CommandShortcut> */}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
