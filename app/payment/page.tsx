'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const handlePay = async (event: React.FormEvent) => {
    try {

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create stripe session');
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment for Viewing</h2>
        <Button
          onClick={handlePay}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Schedule Viewing
        </Button>
       
      </div>
    </div>
  )
}


