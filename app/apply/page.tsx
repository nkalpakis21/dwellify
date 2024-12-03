'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '../lib/firebaseClient';

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

    const handleAutoFill = () => {
      setFormData({
        full_name: "Nicholas Kalpakis",
        email: "Nkalpakis21@gmail.com",
        phone_number: "4124009215",
        employer_name: "sune",
        current_rent: 0,
        monthly_income: 0,
        reason_for_moving: "idk",
        current_address: "311 11th Avenue",
        credit_check_passed: true,
        evicted_status: "yes",
        criminal_record_status: "yes",
        move_in_date: "3months",
      });
    }
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

    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Apply for a Viewing</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input type="tel" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="employer_name">Current Employer</Label>
                <Input type="text" id="employer_name" name="employer_name" value={formData.employer_name} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="monthly_income">Monthly Income</Label>
                <Input type="number" id="monthly_income" name="monthly_income" value={formData.monthly_income} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="current_address">Current Address</Label>
                <Input type="text" id="current_address" name="current_address" value={formData.current_address} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="current_rent">Current Rent Amount</Label>
                <Input type="number" id="current_rent" name="current_rent" value={formData.current_rent} onChange={handleChange} required />
              </div>
              
              <div>
                <Label htmlFor="reason_for_moving">Reason for Moving</Label>
                <Input type="text" id="reason_for_moving" name="reason_for_moving" value={formData.reason_for_moving} onChange={handleChange} required />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="credit_check_passed" 
                  checked={formData.credit_check_passed} 
                  onCheckedChange={handleCheckboxChange} 
                />
                <Label htmlFor="credit_check_passed">I agree to a credit check</Label>
              </div>
              
              <div>
                <Label htmlFor="evicted_status">Have you ever been evicted?</Label>
                <Select name="evicted_status" value={formData.evicted_status} onValueChange={(value) => handleSelectChange('evicted_status', value)}>
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
                <Label htmlFor="criminal_record_status">Do you have a criminal record?</Label>
                <Select name="criminal_record_status" value={formData.criminal_record_status} onValueChange={(value) => handleSelectChange('criminal_record_status', value)}>
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
                <Label htmlFor="move_in_date">Preferred Move-In Date</Label>
                <Select name="move_in_date" value={formData.move_in_date} onValueChange={(value) => handleSelectChange('move_in_date', value)}>
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
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              Continue to Payment
            </Button>
            <Button type="button" onClick={handleAutoFill} disabled={isLoading}>
              Autofill
            </Button>
          </form>
        </div>
    );
}

