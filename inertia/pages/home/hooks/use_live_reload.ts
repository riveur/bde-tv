import { router } from '@inertiajs/react'
import { useEffect } from 'react'

import { transmit } from '@/lib/transmit'

export function useLiveReload() {
  useEffect(() => {
    const subscription = transmit.subscription('live/reload')

    const unsbuscribe = subscription.onMessage((data: string[]) => {
      router.reload({ only: data, showProgress: false })
    })

    subscription.create()

    return () => {
      unsbuscribe()
      subscription.delete()
    }
  }, [])
}
