import { SparklesText } from '@/components/ui/sparkles_text'
import { useCurrentDate } from '@/hooks/use_current_date'
import { formatDate } from '@/lib/date'
import { DateTime } from '@/lib/luxon'

const sparklesTimes = [
  '09:50',
  '10:03',
  '10:05',
  '11:55',
  '13:25',
  '13:30',
  '15:20',
  '15:33',
  '15:35',
  '16:30',
  '17:25',
]

export function DateSparkles() {
  const today = useCurrentDate()
  const currentTime = today.toFormat('HH:mm')
  const shouldSparkle = sparklesTimes.includes(currentTime)
  return shouldSparkle ? (
    <SparklesText
      className="text-2xl font-semibold"
      text={formatDate(today.toISO(), DateTime.DATE_FULL)}
      colors={{ first: '#e2167b', second: '#f8bb22' }}
    />
  ) : (
    <span className="text-2xl font-semibold">{formatDate(today.toISO(), DateTime.DATE_FULL)}</span>
  )
}

export function HourSparkles() {
  const today = useCurrentDate()
  const currentTime = today.toFormat('HH:mm')
  const shouldSparkle = sparklesTimes.includes(currentTime)
  return shouldSparkle ? (
    <SparklesText
      className="text-2xl font-semibold"
      text={formatDate(today.toISO(), DateTime.TIME_SIMPLE)}
      colors={{ first: '#1468ad', second: '#f8bb22' }}
    />
  ) : (
    <span className="text-2xl font-semibold">
      {formatDate(today.toISO(), DateTime.TIME_SIMPLE)}
    </span>
  )
}
