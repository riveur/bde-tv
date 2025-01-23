import { Head as InertiaHead } from '@inertiajs/react'
import * as React from 'react'

import { useAppSettings } from '@/hooks/use_app_settings'

export function Head({ title, children }: React.ComponentProps<typeof InertiaHead>) {
  const settings = useAppSettings()

  return (
    <InertiaHead>
      <title>{title ? `${title} - ${settings.appName}` : settings.appName}</title>
      {children}
    </InertiaHead>
  )
}
