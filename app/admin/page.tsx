'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Tenant {
  id: string
  name: string
  email: string
  appointmentDate: string
  paymentStatus: 'Paid' | 'Pending'
}

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockTenants: Tenant[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', appointmentDate: '2023-06-15 14:00', paymentStatus: 'Paid' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', appointmentDate: '2023-06-16 10:00', paymentStatus: 'Pending' },
    ]
    setTenants(mockTenants)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Viewings</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.name}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>{tenant.appointmentDate}</TableCell>
                <TableCell>{tenant.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

