"use client"

// import { collection, getDocs } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, DollarSign } from 'lucide-react'
import useSWR from 'swr'
import { fetcher } from '@/app/lib/fetch'
import { useAuth } from '@/app/lib/AuthContext'
import { IProperty } from '@/app/types/property'

type Property = {
  id: string
  description: string
  address: string
  price: number
  propertyType: string
  type: 'SALE' | 'RENT'
}

export function PropertyList() {
  const {user} = useAuth();
  const uid = user?.uid || ''
  const { data, isLoading } = useSWR(`/api/users/${uid}/properties`, fetcher)

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
        </Card>
      ))}
    </div>
  )
}

