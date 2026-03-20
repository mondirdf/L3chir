import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://youtube.com/@l3chiiir-j1r'),
  title: 'L3chiiir | Creator Links',
  description:
    'Dark, minimal creator page for L3chiiir featuring comedy storytelling content, social links, and the latest YouTube series.',
  openGraph: {
    title: 'L3chiiir | Creator Links',
    description:
      'Dark, minimal creator page for L3chiiir featuring comedy storytelling content, social links, and the latest YouTube series.',
    images: [{ url: '/og-image.svg', type: 'image/svg+xml', width: 1200, height: 630, alt: 'L3chiiir OG Image' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L3chiiir | Creator Links',
    description:
      'Dark, minimal creator page for L3chiiir featuring comedy storytelling content, social links, and the latest YouTube series.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: '/l3chiiir.svg',
    shortcut: '/l3chiiir.svg',
    apple: '/l3chiiir.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
