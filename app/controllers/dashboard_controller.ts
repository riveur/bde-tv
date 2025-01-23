import type { HttpContext } from '@adonisjs/core/http'

import { db } from '#services/db'

export default class DashboardController {
  async handle({ inertia }: HttpContext) {
    const news = () => db.news.all()
    const events = () => db.events.all()
    const slides = () => db.slides.query().orderBy('order', 'asc')

    return inertia.render('dashboard/index', { news, events, slides })
  }
}
