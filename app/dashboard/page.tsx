import { CopyApplicationLink } from "@/components/dashboard/ApplicationLink";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardOverview } from "@/components/dashboard/overview";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader 
        heading="Dashboard" 
        text="Welcome to your Dwellify dashboard"
      />
      <div className="my-6">
        <CopyApplicationLink />
      </div>
      <DashboardOverview />
    </>
  )
}

