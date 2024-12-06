"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IPropertyForm } from '@/app/types/property'
import { useAuth } from '@/app/lib/AuthContext'

type AddPropertyFormProps = {
  onSuccess?: () => void;
}

export function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IPropertyForm>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth();
  const onSubmit = async (data: IPropertyForm) => {
    setIsSubmitting(true)
    if(!user) {
      console.error('Error adding property. User object not set');
      return;
    }
    try {
      const uid = user.uid;
      const response = await fetch('/api/property', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({...data, userId: uid}),
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      if(onSuccess) {
        onSuccess();
      }
    } catch (error) {
        console.error('Error adding property:', error);
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-600">Add New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-sm font-medium">
                Property Address
              </Label>
              <Input 
                id="address" 
                {...register('address', { required: 'Address is required' })}
                className="mt-1.5"
                placeholder="Enter the full property address"
              />
              {errors.address && (
                <p className="mt-1.5 text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea 
                id="description" 
                {...register('description', { required: 'Description is required' })}
                className="mt-1.5 min-h-[100px]"
                placeholder="Describe the property..."
              />
              {errors.description && (
                <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="price" 
                    type="number" 
                    {...register('price', { required: 'Price is required', min: 0 })}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="propertyType" className="text-sm font-medium">
                  Property Type
                </Label>
                <Select onValueChange={(value) => register('propertyType').onChange({ target: { value } })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.propertyType.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Listing Type
              </Label>
              <RadioGroup 
                defaultValue="RENT" 
                {...register('type', { required: 'Listing type is required' })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="RENT" id="rent" />
                  <Label htmlFor="rent" className="font-normal">For Rent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SALE" id="sale" />
                  <Label htmlFor="sale" className="font-normal">For Sale</Label>
                </div>
              </RadioGroup>
              {errors.type && (
                <p className="mt-1.5 text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Adding Property...' : 'Add Property'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

