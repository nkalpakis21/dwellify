import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Find Your Perfect Home</h1>
      <p className="text-xl mb-8">Discover amazing properties and schedule a viewing today!</p>
      <Link href="/apply">
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
          Apply for a Viewing
        </Button>
      </Link>
    </div>
  )
}