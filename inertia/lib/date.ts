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
