import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

import { db } from '#services/db'

const createEventValidator = vine.compile(
  vine.object({
    title: vine.string(),
    startAt: vine
      .date({ formats: ['yyyy-MM-dd'] })
      .transform((value) => DateTime.fromJSDate(value)),
    endAt: vine.date({ formats: ['yyyy-MM-dd'] }).transform((value) => DateTime.fromJSDate(value)),
  })
)

const updateEventValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    startAt: vine
      .date({ formats: ['yyyy-MM-dd'] })
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
    endAt: vine
      .date({ formats: ['yyyy-MM-dd'] })
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
  })
)

export default class EventsController {
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEventValidator)

    await db.events.create(payload)

    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const event = await db.events.findOrFail(params.id)
    const payload = await request.validateUsing(updateEventValidator)

    await event.merge(payload).save()

    return response.redirect().back()
  }

  async delete({ params, response }: HttpContext) {
    const event = await db.events.findOrFail(params.id)

    await event.delete()

    return response.redirect().back()
  }
}
