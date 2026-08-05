import { cn } from "@/lib/utils"

interface FeeBadgeProps {
  status: 'paid' | 'pending' | 'overdue' | string
}

export function FeeBadge({ status }: FeeBadgeProps) {
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border",
      {
        "bg-eden/10 text-eden border-eden/20": status === 'paid' || status === 'completed',
        "bg-amber-500/10 text-amber-700 border-amber-500/20": status === 'pending',
        "bg-crimson/10 text-crimson border-crimson/20": status === 'overdue' || status === 'failed',
      }
    )}>
      {status}
    </span>
  )
}
