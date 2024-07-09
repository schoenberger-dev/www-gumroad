import './globals.css';
import type { Metadata } from 'next';
import { Wayfinder } from '@/lib/ui/fonts';
import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Gumroad ✧ Niklas',
  description: 'the beginning of something great.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[Wayfinder.variable, GeistSans.variable].join(' ')}
    >
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="stylesheet" href="https://use.typekit.net/pgl2zil.css" />
      </head>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
