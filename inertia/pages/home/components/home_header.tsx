import { useCurrentDate } from '@/hooks/use_current_date'
import { formatDate } from '@/lib/date'
import { DateTime } from '@/lib/luxon'
import { cn } from '@/lib/utils'

export function HomeHeader({ className, ...props }: React.ComponentProps<'header'>) {
  const today = useCurrentDate()

  return (
    <header
      className={cn('flex items-center justify-between text-2xl font-semibold', className)}
      {...props}
    >
      <span>{formatDate(today.toISO(), DateTime.DATE_FULL)}</span>
      <span>{formatDate(today.toISO(), DateTime.TIME_SIMPLE)}</span>
    </header>
  )
}
