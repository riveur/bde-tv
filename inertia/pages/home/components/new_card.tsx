import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { New } from '@/types'
import { DateTime } from 'luxon'

interface NewCardProps {
  new: New
}

export function NewCard({ new: data }: NewCardProps) {
  const colors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  }
  return (
    <Card className={cn('rounded-lg relative pt-1 border-t-0')}>
      <div className={cn('absolute top-0 inset-x-0 h-1 rounded-t-lg', colors[data.level])} />
      <CardHeader className="p-2">
        <CardTitle className="font-light">
          {formatDate(data.createdAt, DateTime.DATE_SHORT)}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0 space-y-2">
        <CardTitle className="text-lg font-normal">{data.title}</CardTitle>
        <CardDescription className="text-base">{data.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
