'use client';

import { AuthBadge } from '@/components/challenge/auth';
import { CommandMenu } from '@/components/command-menu';
import StoreProvider from '@/providers/store-provider';
import { ReactNode } from 'react';

export default function ChallengeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StoreProvider>
      {children}
      <AuthBadge />
      <CommandMenu />
    </StoreProvider>
  );
}
