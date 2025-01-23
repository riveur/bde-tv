import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import vine from '@vinejs/vine'

import { db } from '#services/db'

const createNewValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    level: vine.enum(['low', 'medium', 'high']),
  })
)

const updateNewValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    description: vine.string().optional(),
    level: vine.enum(['low', 'medium', 'high']).optional(),
  })
)

export default class NewsController {
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createNewValidator)

    await db.news.create(payload)

    transmit.broadcast('live/reload', ['news'])

    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const event = await db.news.findOrFail(params.id)
    const payload = await request.validateUsing(updateNewValidator)

    await event.merge(payload).save()

    transmit.broadcast('live/reload', ['news'])

    return response.redirect().back()
  }

  async delete({ params, response }: HttpContext) {
    const event = await db.news.findOrFail(params.id)

    await event.delete()

    transmit.broadcast('live/reload', ['news'])

    return response.redirect().back()
  }
}
