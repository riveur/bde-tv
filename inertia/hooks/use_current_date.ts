import { useState, useEffect } from 'react'

import { DateTime } from '@/lib/luxon'

export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState(() => DateTime.now())

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(DateTime.now())
    }

    const now = DateTime.now()
    const millisecondsToNextMinute = 60000 - now.millisecond - now.second * 1000

    const timeoutId = setTimeout(() => {
      updateDate()

      const intervalId = setInterval(updateDate, 60000)

      return () => clearInterval(intervalId)
    }, millisecondsToNextMinute)

    // Nettoyage au démontage
    return () => clearTimeout(timeoutId)
  }, [])

  return currentDate
}
