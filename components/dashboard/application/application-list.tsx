import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Application = {
  id: string
  full_name: string
  email: string
  phone_number: string
  current_address: string
  employer_name: string
  monthly_income: number
  current_rent: number
  move_in_date: string
  reason_for_moving: string
  credit_check_passed: boolean
  criminal_record_status: string
  evicted_status: string
  createdAt: string
  propertyId: string
}

type ApplicationListProps = {
  applications: Application[]
}

export function ApplicationList({ applications }: ApplicationListProps) {
  if(!applications) {
    return (null)
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {applications.map((application) => (
        <Card key={application.id} className="flex flex-col w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="truncate">{application.full_name}</span>
              <Badge variant={application.credit_check_passed ? 'default' : 'destructive'}>
                {application.credit_check_passed ? 'Passed' : 'Failed'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm"><strong>Email:</strong> {application.email}</p>
              <p className="text-sm"><strong>Phone:</strong> {application.phone_number}</p>
              <p className="text-sm"><strong>Current Address:</strong> {application.current_address}</p>
              <p className="text-sm"><strong>Employer:</strong> {application.employer_name}</p>
              <p className="text-sm"><strong>Monthly Income:</strong> ${application.monthly_income.toLocaleString()}</p>
              <p className="text-sm"><strong>Move-in Date:</strong> {application.move_in_date}</p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm"><strong>Applied on:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

