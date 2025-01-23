import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { db } from '#services/db'
import { WeatherService } from '#services/weather_service'
import env from '#start/env'

@inject()
export default class HomeController {
  constructor(private weatherService: WeatherService) {}

  async handle({ inertia }: HttpContext) {
    const news = () => db.news.query().orderBy('created_at', 'desc').limit(3)
    const events = () =>
      db.events
        .query()
        .withScopes((scopes) => scopes.incoming())
        .orderBy('start_at', 'asc')
        .limit(5)
    const slides = () => db.slides.query().whereNotNull('order').orderBy('order', 'asc')

    const weather = await this.weatherService.getWeather(env.get('OPENWEATHER_CITY') || 'Paris')
    const carouselDelay = env.get('CAROUSEL_DELAY')

    return inertia.render('home/index', { news, events, slides, weather, carouselDelay })
  }
}
