import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const settingValidator = vine.compile(
  vine.object({
    appName: vine.string(),
    refreshInterval: vine.number(),
    carouselInterval: vine.number(),
    weatherCity: vine.string(),
    weatherTtl: vine.string(),
    googleNewsTopicToken: vine.string(),
  })
)

export type SettingData = Infer<typeof settingValidator>
