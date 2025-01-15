import { DateTimeFormatOptions } from 'luxon'

import { DateTime } from '@/lib/luxon'

export function formatDate(
  date: string | Date,
  format: DateTimeFormatOptions | string = DateTime.DATETIME_MED_WITH_SECONDS
) {
  const instance = date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date)

  if (typeof format === 'string') {
    return instance.toFormat(format)
  }

  return instance.toLocaleString(format)!
}

export function formatDateHumanReadeble(...args: Parameters<typeof formatDate>) {
  const instance =
    args[0] instanceof Date ? DateTime.fromJSDate(args[0]) : DateTime.fromISO(args[0])
  const today = DateTime.now()

  switch (true) {
    case instance.hasSame(today, 'day'):
      return "Aujourd'hui"
    case instance.hasSame(today.plus({ days: 1 }), 'day'):
      return 'Demain'
    case instance.hasSame(today.minus({ days: 1 }), 'day'):
      return 'Hier'
    default:
      return formatDate(...args)
  }
}

export function getDuration(startAt: string, endAt: string) {
  const start = new Date(startAt)
  const end = new Date(endAt)
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return days <= 1 ? `${days} jour` : `${days} jours`
}
