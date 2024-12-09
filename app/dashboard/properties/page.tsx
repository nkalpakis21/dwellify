"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardHeader } from '@/components/dashboard/header'
import { PropertyList } from './PropertyList'
import { AddPropertyForm } from './AddProperty'

export default function PropertiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <div className="space-y-8">
      <DashboardHeader 
        heading="Properties" 
        text="Manage your property listings"
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogDescription>
                  Fill in the details of the new property you want to add.
                </DialogDescription>
              </DialogHeader>
              <AddPropertyForm onSuccess={() => {
                setIsDialogOpen(false)
                setRefreshTrigger(prev => prev + 1)
              }} />
            </DialogContent>
          </Dialog>
        </div>
        <PropertyList key={refreshTrigger} />
      </div>
    </div>
  )
}

