export function DashboardHeader({
    heading,
    text,
  }: {
    heading: string
    text?: string
  }) {
    return (
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold tracking-wide text-primary">{heading}</h1>
          {text && <p className="text-lg text-muted-foreground">{text}</p>}
        </div>
      </div>
    )
  }
  
  