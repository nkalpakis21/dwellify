"use client"

import { useAuth } from "@/app/lib/AuthContext";
import { fetcher } from "@/app/lib/fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, FileText } from 'lucide-react'
import useSWR from 'swr'


export function DashboardOverview() {
  const { user } = useAuth();
  const uid = user?.uid || ''

  const { data: propertiesData, error: propertiesError } = useSWR(
    uid ? `/api/users/${uid}/properties` : null,
    fetcher
  )

  const { data: applicationsData, error: applicationsError } = useSWR(
    uid ? `/api/users/${uid}/application/all` : null,
    fetcher
  )

  const isLoading = !propertiesData || !applicationsData
  const isError = propertiesError || applicationsError

  if (isError) {
    return <div className="text-center text-red-500">Error loading dashboard data</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Properties
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-2xl font-bold animate-pulse">Loading...</div>
          ) : (
            <>
              <div className="text-2xl font-bold">{propertiesData.length}</div>
              <p className="text-xs text-muted-foreground">
                Active property listings
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Applications
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-2xl font-bold animate-pulse">Loading...</div>
          ) : (
            <>
              <div className="text-2xl font-bold">{applicationsData.applications?.length}</div>
              <p className="text-xs text-muted-foreground">
                Received applications
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

