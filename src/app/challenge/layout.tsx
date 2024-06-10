import { StoreProvider } from '@/providers/store-provider';
import { ReactNode } from 'react';

export default function ChallengeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
