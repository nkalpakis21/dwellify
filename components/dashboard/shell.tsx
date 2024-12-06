"use client"

import { useState } from 'react'
import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Home, Building, FileText, DollarSign, LogOut } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logout } from '@/app/lib/authClient'

export function DashboardShell({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Properties', href: '/dashboard/properties', icon: Building },
    { name: 'Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/login') // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout failed:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Navigation */}
      <div className="hidden border-r bg-background md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <div className="border-b px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Dwellify</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t pt-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="md:border-none border-b p-4">
            <SheetTitle>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-blue-600">Dwellify</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t px-2 pt-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:pl-72">
        <div className="px-4 py-6 md:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

