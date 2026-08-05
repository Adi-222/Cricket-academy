import { ReactNode } from "react"
import { Shield } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate/20 rounded-xl">
      <div className="h-16 w-16 bg-pitch rounded-full flex items-center justify-center text-muted-foreground mb-4">
        {icon || <Shield className="w-8 h-8 opacity-50 text-slate" />}
      </div>
      <h3 className="text-xl font-heading mb-2 text-slate uppercase">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6 font-sans">{description}</p>
      {action}
    </div>
  )
}
