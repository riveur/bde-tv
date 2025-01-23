import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'
import ky from 'ky'

import cache from '#cache/cache'
import { SettingRepository } from '#repositories/setting_repository'
import env from '#start/env'

const API_KEY = env.get('OPENWEATHER_API_KEY')

const weatherSchema = vine.compile(
  vine.object({
    main: vine.object({
      temp: vine.number(),
      humidity: vine.number(),
      feels_like: vine.number(),
    }),
    weather: vine.array(
      vine.object({
        main: vine.string(),
        description: vine.string(),
        icon: vine.string(),
      })
    ),
    wind: vine.object({
      speed: vine.number(),
    }),
    name: vine.string(),
  })
)

export type WeatherData = Infer<typeof weatherSchema>

@inject()
export class WeatherService {
  constructor(private settingRepository: SettingRepository) {}

  async getWeather(city: string) {
    if (!API_KEY) {
      return null
    }

    try {
      const weatherTtl = await this.settingRepository.getSetting('weatherTtl')

      return cache.getOrSet({
        key: `weather:${city}`,
        factory: async () => {
          const response = await ky.get('https://api.openweathermap.org/data/2.5/weather', {
            searchParams: { q: city, appid: API_KEY, units: 'metric' },
          })
          const data = await response.json()
          const [error, result] = await weatherSchema.tryValidate(data)
          if (error) {
            throw new Error('Invalid weather data')
          }
          return result
        },
        ttl: weatherTtl,
      })
    } catch (error: unknown) {
      return null
    }
  }
}
