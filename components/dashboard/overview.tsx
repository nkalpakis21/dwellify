"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, FileText, TrendingUp, TrendingDown } from 'lucide-react'
import useSWR from 'swr'
import { useAuth } from '@/app/lib/AuthContext'
import { Skeleton } from "@/components/ui/skeleton"
import { fetcher } from "@/app/lib/fetch"

export function DashboardOverview() {
  const { user } = useAuth();
  const uid = user?.uid || ''

  const { data: propertiesData, error: propertiesError } = useSWR(
    uid ? `/api/users/${uid}/properties` : null,
    fetcher
  )

  const { data: applicationsData, error: applicationsError } = useSWR(
    uid ? `/api/application/user/${uid}/all` : null,
    fetcher
  )

  const isLoading = !propertiesData || !applicationsData
  const isError = propertiesError || applicationsError

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg border border-red-200">
        Error loading dashboard data. Please try again later.
      </div>
    )
  }

  // Dummy data for demonstration purposes
  const propertyTrend = 5 // Positive trend
  const applicationTrend = -2 // Negative trend

  return (
    <div className="space-y-6 mt-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50">
            <CardTitle className="text-sm font-medium text-blue-800">
              Total Properties
            </CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">{propertiesData.length}</div>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {propertyTrend}%
                </div>
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Active property listings
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-purple-50">
            <CardTitle className="text-sm font-medium text-purple-800">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">{applicationsData.applications?.length}</div>
                <div className="flex items-center text-sm font-medium text-red-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  {Math.abs(applicationTrend)}%
                </div>
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Received applications
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

