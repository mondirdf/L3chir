import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramzi ZRT | Cinematic Creator Portfolio',
  description:
    'Cinematic black-and-white creator portfolio for Ramzi ZRT — Photographer, Graphic Designer, Video Editor, and YouTube Content Creator.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
