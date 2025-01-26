import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { SettingRepository } from '#repositories/setting_repository'
import { db } from '#services/db'
import { GoogleNewsService } from '#services/google_news_service'
import { WeatherService } from '#services/weather_service'

@inject()
export default class HomeController {
  constructor(
    private weatherService: WeatherService,
    private settingRepository: SettingRepository,
    private googleNewsService: GoogleNewsService
  ) {}

  async handle({ inertia }: HttpContext) {
    const news = () => db.news.query().orderBy('created_at', 'desc').limit(3)
    const events = () =>
      db.events
        .query()
        .withScopes((scopes) => scopes.incoming())
        .orderBy('start_at', 'asc')
        .limit(5)
    const slides = () => db.slides.query().whereNotNull('order').orderBy('order', 'asc')

    const weatherCity = await this.settingRepository.getSetting('weatherCity')
    const weather = inertia.always(() => this.weatherService.getWeather(weatherCity))
    const googleNews = inertia.defer(() => this.googleNewsService.getArticles(weatherCity))

    return inertia.render('home/index', { news, events, slides, weather, googleNews })
  }
}
