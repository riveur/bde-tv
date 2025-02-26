import { cn } from '@/lib/utils'
import { DateSparkles, HourSparkles } from './sparkles_trigger'

export function HomeHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn('flex items-center justify-between text-2xl font-semibold', className)}
      {...props}
    >
      <DateSparkles />
      <HourSparkles />
    </header>
  )
}
