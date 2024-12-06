'use client'; // This is a client-side component, because we're using hooks

import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toolbar } from '@/components/Toolbar'
import { AuthProvider } from './lib/AuthContext';

const inter = Inter({ subsets: ['latin'] })

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

