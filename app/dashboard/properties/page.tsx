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
import { AddPropertyForm } from './AddProperty'
import { PropertyList } from './PropertyList'

export default function PropertiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardHeader 
          heading="Properties" 
          text="Manage your property listings"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
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
      <div className="container mx-auto px-4">
        <PropertyList key={refreshTrigger} />
      </div>
    </div>
  )
}

