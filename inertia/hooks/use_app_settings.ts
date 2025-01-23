import { usePage } from '@inertiajs/react'

import type { SettingData } from '#validators/setting_validator'

export function useAppSettings() {
  const page = usePage()
  const settings = page.props.appSettings

  if (!settings) {
    throw new Error('App settings are missing')
  }

  return settings as SettingData
}
