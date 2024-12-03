import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToolbarCombined } from '@/components/Toolbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dwellify - Find Your Perfect Home',
  description: 'Discover amazing properties and schedule a viewing today!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full flex flex-col">
          <ToolbarCombined />
          {children}
        </div>
      </body>
    </html>
  )
}

