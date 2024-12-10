// app/layout.tsx (Server-side)

import './globals.css';
import { Inter } from 'next/font/google';
import { Toolbar } from '@/components/Toolbar';
import { AuthProvider } from './lib/AuthContext';

// **No 'use client' directive** here since we are handling metadata server-side

// Metadata export (server-side)
export const metadata = {
  title: 'Dwellify | Streamline your property management with Dwellify',
  description: 'Streamline your property management with Dwellify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dwellify.xyz',
    siteName: 'Dwellify',
    images: [
      {
        url: 'https://dwellify.xyz/share_image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  x: {
    card: 'summary_large_image',
    site: '@dwellify', // Replace with your actual X account handle once created
    title: 'Dwellify | Streamline your property management with Dwellify',
    description: 'Streamline your property management with Dwellify',
    image: 'https://dwellify.com/share_image.png',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          <div className="min-h-full flex flex-col">
            <Toolbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
