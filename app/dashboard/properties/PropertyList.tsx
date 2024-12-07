"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Building, DollarSign, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import useSWR from 'swr'
import { useAuth } from '@/app/lib/AuthContext'
import { fetcher } from '@/app/lib/fetch'

type Feedback = {
  id: string
  refType: string
  refId: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  feedbackData: {
    criteriaMatch: boolean
    locationSatisfaction: boolean
    additionalComments: string
    propertyImpression: 'yes' | 'maybe' | 'no'
  }
}

type Property = {
  id: string
  type: 'RENT' | 'SALE'
  listedBy: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  address: string
  images: string[]
  price: number
  description: string
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  feedback: Feedback[]
}

export function PropertyList() {
  const { user } = useAuth();
  const uid = user?.uid || ''
  const { data, isLoading } = useSWR<Property[]>(`/api/users/${uid}/properties`, fetcher)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null)

  const copyToClipboard = (property: Property) => {
    const refType = property.type.toLowerCase()
    const url = `${window.location.origin}/apply/${refType}/${property.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(property.id)
      setTimeout(() => setCopiedId(null), 2000) // Reset after 2 seconds
    })
  }

  const toggleExpand = (propertyId: string) => {
    setExpandedProperty(expandedProperty === propertyId ? null : propertyId)
  }

  if (isLoading || !data) {
    return <div className="text-center">Loading properties...</div>
  }

  return (
    <div className="space-y-4">
      {data.map((property) => (
        <Card key={property.id} className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span className="truncate text-lg">{property.address}</span>
              <Badge variant={property.type === 'RENT' ? 'secondary' : 'destructive'}>
                {property.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                <span className="text-sm capitalize">{property.description}</span>
              </div>
              <div className="flex items-center font-semibold">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{property.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full text-sm"
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
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-sm"
                    onClick={() => toggleExpand(property.id)}
                  >
                    {expandedProperty === property.id ? (
                      <>
                        Hide Feedback
                        <ChevronUp className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Show Feedback ({property.feedback.length})
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  {property.feedback.length > 0 ? (
                    <div className="space-y-4">
                      {property.feedback.map((feedback) => (
                        <Card key={feedback.id} className="bg-gray-50">
                          <CardContent className="pt-4">
                            <p><strong>Impression:</strong> {feedback.feedbackData.propertyImpression}</p>
                            <p><strong>Location:</strong> {feedback.feedbackData.locationSatisfaction ? 'Satisfied' : 'Not Satisfied'}</p>
                            <p><strong>Criteria Match:</strong> {feedback.feedbackData.criteriaMatch ? 'Yes' : 'No'}</p>
                            <p><strong>Comments:</strong> {feedback.feedbackData.additionalComments}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Submitted on: {new Date(feedback.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No feedback available for this property.</p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

