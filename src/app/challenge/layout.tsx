import { CartStoreProvider } from '@/providers/cart-store-provider';
import { ReactNode } from 'react';

export default function ChallengeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <CartStoreProvider>{children}</CartStoreProvider>;
}
