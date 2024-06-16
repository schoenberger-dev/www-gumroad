'use client';

import { AuthBadge } from '@/components/challenge/auth';
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
    </StoreProvider>
  );
}
