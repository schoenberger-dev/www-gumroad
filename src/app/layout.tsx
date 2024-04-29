import './globals.css';
import type { Metadata } from 'next';
import { Wayfinder } from '@/lib/ui/fonts';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ars · ludica',
  description: 'by schoen.works',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Wayfinder.className}>{children}</body>
    </html>
  );
}
