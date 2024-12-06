import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardOverview } from "@/components/dashboard/overview";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader 
        heading="Dashboard" 
        text="Welcome to your Dwellify dashboard"
      />
      <DashboardOverview />
    </>
  )
}

