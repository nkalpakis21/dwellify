'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ApplyForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employer: '',
    monthlyIncome: '',
    currentAddress: '',
    currentRent: '',
    reasonForMoving: '',
    creditCheck: false,
    evicted: 'no',
    criminalRecord: 'no',
    moveInDate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log(formData)
    // For now, we'll just redirect to the payment page
    router.push('/payment')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Apply for a Viewing</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="employer">Current Employer</Label>
            <Input type="text" id="employer" name="employer" value={formData.employer} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="monthlyIncome">Monthly Income</Label>
            <Input type="number" id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="currentAddress">Current Address</Label>
            <Input type="text" id="currentAddress" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="currentRent">Current Rent Amount</Label>
            <Input type="number" id="currentRent" name="currentRent" value={formData.currentRent} onChange={handleChange} required />
          </div>
          
          <div>
            <Label htmlFor="reasonForMoving">Reason for Moving</Label>
            <Input type="text" id="reasonForMoving" name="reasonForMoving" value={formData.reasonForMoving} onChange={handleChange} required />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="creditCheck" name="creditCheck" checked={formData.creditCheck} onCheckedChange={(checked) => handleSelectChange('creditCheck', checked ? 'true' : 'false')} />
            <Label htmlFor="creditCheck">I agree to a credit check</Label>
          </div>
          
          <div>
            <Label htmlFor="evicted">Have you ever been evicted?</Label>
            <Select name="evicted" value={formData.evicted} onValueChange={(value) => handleSelectChange('evicted', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="criminalRecord">Do you have a criminal record?</Label>
            <Select name="criminalRecord" value={formData.criminalRecord} onValueChange={(value) => handleSelectChange('criminalRecord', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="moveInDate">Preferred Move-In Date</Label>
            <Select name="moveInDate" value={formData.moveInDate} onValueChange={(value) => handleSelectChange('moveInDate', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">As soon as possible</SelectItem>
                <SelectItem value="1month">Within 1 month</SelectItem>
                <SelectItem value="2months">Within 2 months</SelectItem>
                <SelectItem value="3months">Within 3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className="w-full mt-6">
          Continue to Payment
        </Button>
      </form>
    </div>
  )
}

