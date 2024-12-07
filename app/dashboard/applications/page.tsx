"use client"

import { useState } from 'react'
import useSWR from 'swr'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/app/lib/AuthContext'
import { fetcher } from '@/app/lib/fetch'

import { DashboardHeader } from '@/components/dashboard/header'
import { IProperty } from '@/app/types/property'
import { IApplication } from '@/app/types/application'
import { ApplicationList } from '@/components/dashboard/application/application-list'

export default function ApplicationsPage() {
  const { user } = useAuth();
  const uid = user?.uid || ''
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  
  const { data, isLoading: isLoadingProperties } = useSWR(
    `/api/users/${uid}/application/all`,
    fetcher
  )

  if (isLoadingProperties || !data || !uid) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <DashboardHeader 
        heading="Applications" 
        text="View and manage applications from buyers and renters"
      />
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4 mb-6">
          <Label htmlFor="property-select" className="text-sm font-medium">
            Filter by Property:
          </Label>
          <Select
            onValueChange={(value) => setSelectedProperty(value || null)}
            value={selectedProperty || ''}
          >
            <SelectTrigger id="property-select" className="w-[200px]">
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Properties</SelectItem>
              {data.properties?.map((property: IProperty) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ApplicationList
            applications={
              data?.applications.filter((application: IApplication) => {
                if (selectedProperty && selectedProperty !== "ALL") {
                  // If a property is selected, filter applications by the selected property
                  const selectedPropertyObject = data?.properties.find(
                    (property: IProperty) => property.id === selectedProperty
                  );
                  return application.refId === selectedPropertyObject?.id;
                } else {
                  // If no property is selected, include all applications
                  return true;
                }
              }) || []
            }
          />
      </div>
    </div>
  )
}

