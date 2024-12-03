import Link from 'next/link'
import { Home } from 'lucide-react'

// Version 1: Simple centered toolbar
export function Toolbar1() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">Dwellify</span>
        </Link>
      </div>
    </header>
  )
}

// Version 2: Left-aligned with gradient background
export function Toolbar2() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="text-xl font-bold">Dwellify</span>
        </Link>
      </div>
    </header>
  )
}

// Version 3: Centered with custom logo
export function Toolbar3() {
  return (
    <header className="bg-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <Link href="/" className="flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Home className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-800 mt-1">Dwellify</span>
        </Link>
      </div>
    </header>
  )
}

// Version 4: Full-width with subtle border
export function Toolbar4() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Dwellify</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

// Version 5: Minimalist with animated hover effect
export function Toolbar5() {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <Link href="/" className="group flex items-center space-x-2">
          <div className="relative">
            <Home className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            <div className="absolute inset-0 bg-blue-100 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></div>
          </div>
          <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Dwellify</span>
        </Link>
      </div>
    </header>
  )
}

// Combined version: Positioning from Toolbar4 with colors from Toolbar1
export function ToolbarCombined() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">Dwellify</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/photos" className="text-blue-600 hover:text-blue-800">Photos</Link></li>
            {/* <li><Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link></li> */}
            {/* <li><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}

