import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NewBadgeProps {
  level: 'low' | 'medium' | 'high'
}

export function NewBadge({ level }: NewBadgeProps) {
  const colors = {
    low: 'border-blue-500',
    medium: 'border-yellow-500',
    high: 'border-red-500',
  }

  return (
    <Badge className={cn(colors[level])} variant="outline">
      {level.toUpperCase()}
    </Badge>
  )
}
