"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, DollarSign, Copy, Check } from 'lucide-react'
import useSWR from 'swr'
import { fetcher } from '@/app/lib/fetch'
import { useAuth } from '@/app/lib/AuthContext'
import { IProperty } from '@/app/types/property'

export function PropertyList() {
  const { user } = useAuth();
  const uid = user?.uid || ''
  const { data, isLoading } = useSWR(`/api/users/${uid}/properties`, fetcher)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (property: IProperty) => {
    const refType = property.type.toLowerCase()
    const url = `${window.location.origin}/apply/${refType}/${property.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(property.id)
      setTimeout(() => setCopiedId(null), 2000) // Reset after 2 seconds
    })
  }

  if (isLoading || !data) {
    return <div className="text-center">Loading properties...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((property: IProperty) => (
        <Card key={property.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="truncate">{property.address}</span>
              <Badge variant={property.type === 'RENT' ? 'secondary' : 'destructive'}>
                {property.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{property.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                <span className="text-sm capitalize">{property.propertyType}</span>
              </div>
              <div className="flex items-center font-semibold">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{property.price.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => copyToClipboard(property)}
            >
              {copiedId === property.id ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Application Link
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

