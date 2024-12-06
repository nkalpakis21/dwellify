import { cn } from "@/app/lib/utils"

type DashboardHeaderProps = {
  heading: string
  text?: string
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  className
}: DashboardHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)}>
      <h1 className="text-3xl font-bold tracking-wide text-primary">{heading}</h1>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
    </div>
  )
}

