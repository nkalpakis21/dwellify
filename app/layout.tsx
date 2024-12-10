'use client'; // This is a client-side component, because we're using hooks

import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toolbar } from '@/components/Toolbar'
import { AuthProvider } from './lib/AuthContext';
import { Head } from 'next/document';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dwellify | Streamline your property management with Dwellify',
  description: 'Streamline your property management with Dwellify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dwellify.com',
    siteName: 'Dwellify',
    images: [
      {
        url: 'https://dwellify.com/og-default.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dwellify',
    title: 'Dwellify | Streamline your property management with Dwellify',
    description: 'Streamline your property management with Dwellify',
    image: 'https://dwellify.com/og-default.png',
  },
};
// since client component because of FB we cant have meta data. need to move to server
// export const metadata: Metadata = {
//   title: 'Dwellify - Find Your Perfect Home',
//   description: 'Discover amazing properties and schedule a viewing today!',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <Head>
        {/* Title and Description */}
        <title>Dwellify | Streamline your property management with Dwellify</title>
        <meta name="description" content="Streamline your property management with Dwellify" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://dwellify.com" />
        <meta property="og:site_name" content="Dwellify" />
        <meta property="og:title" content="Dwellify | Streamline your property management with Dwellify" />
        <meta property="og:description" content="Streamline your property management with Dwellify" />
        <meta property="og:image" content="https://dwellify.com/og-default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dwellify" />
        <meta name="twitter:title" content="Dwellify | Streamline your property management with Dwellify" />
        <meta name="twitter:description" content="Streamline your property management with Dwellify" />
        <meta name="twitter:image" content="https://dwellify.com/og-default.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          <div className="min-h-full flex flex-col">
            <Toolbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

