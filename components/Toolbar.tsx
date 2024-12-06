"use client"

import Link from "next/link"
import { Building, DollarSign, FileText, Home, Menu } from 'lucide-react'
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/app/lib/utils"

export function ToolbarCombined() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Properties', href: '/dashboard/properties', icon: Building },
    { name: 'Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
  ]

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isDashboard && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b p-4">
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
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link href={isDashboard ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Dwellify</span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {!isDashboard && (
              <>
                <li><Link href="/photos" className="text-blue-600 hover:text-blue-800">Photos</Link></li>
                <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

