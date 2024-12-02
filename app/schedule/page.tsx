'use client'

import { useEffect } from 'react'
import { InlineWidget } from 'react-calendly'

export default function Schedule() {
  useEffect(() => {
    // You can add any necessary setup here
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Schedule Your Viewing</h2>
        <InlineWidget url="https://calendly.com/nkalpakis21" />
      </div>
    </div>
  )
}

