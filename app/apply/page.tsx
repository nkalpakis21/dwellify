'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormData } from '../types/types';

export default function ApplyForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
      full_name: '',
      email: '',
      phone_number: '',
      employer_name: '',
      current_rent: 0,
      monthly_income: 0,
      reason_for_moving: '',
      current_address: '',
      credit_check_passed: false,
      evicted_status: '',
      criminal_record_status: '',
      move_in_date: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
      setFormData(prevState => ({
        ...prevState,
        credit_check_passed: checked,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
              throw new Error('Failed to create stripe session');
            }
      
            const { url } = await response.json();
            router.push(url);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-600">Apply for a Viewing</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input type="tel" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="current_address" className="text-sm font-medium text-gray-700">Current Address</Label>
                    <Input type="text" id="current_address" name="current_address" value={formData.current_address} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="employer_name" className="text-sm font-medium text-gray-700">Current Employer</Label>
                    <Input type="text" id="employer_name" name="employer_name" value={formData.employer_name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="monthly_income" className="text-sm font-medium text-gray-700">Monthly Income</Label>
                    <Input type="number" id="monthly_income" name="monthly_income" value={formData.monthly_income} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="current_rent" className="text-sm font-medium text-gray-700">Current Rent Amount</Label>
                    <Input type="number" id="current_rent" name="current_rent" value={formData.current_rent} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <Label htmlFor="reason_for_moving" className="text-sm font-medium text-gray-700">Reason for Moving</Label>
                    <Input type="text" id="reason_for_moving" name="reason_for_moving" value={formData.reason_for_moving} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Checkbox 
                      id="credit_check_passed" 
                      checked={formData.credit_check_passed} 
                      onCheckedChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="credit_check_passed" className="ml-2 block text-sm text-gray-700">I agree to a credit check</Label>
                  </div>

                  <div>
                    <Label htmlFor="evicted_status" className="block text-sm font-medium text-gray-700">Have you ever been evicted?</Label>
                    <Select name="evicted_status" value={formData.evicted_status} onValueChange={(value) => handleSelectChange('evicted_status', value)}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="criminal_record_status" className="block text-sm font-medium text-gray-700">Do you have a criminal record?</Label>
                    <Select name="criminal_record_status" value={formData.criminal_record_status} onValueChange={(value) => handleSelectChange('criminal_record_status', value)}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="move_in_date" className="block text-sm font-medium text-gray-700">Preferred Move-In Date</Label>
                    <Select name="move_in_date" value={formData.move_in_date} onValueChange={(value) => handleSelectChange('move_in_date', value)}>
                      <SelectTrigger className="w-full mt-1">
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Continue to Payment'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
    );
}