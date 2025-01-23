import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import transmit from '@adonisjs/transmit/services/main'
import vine from '@vinejs/vine'

import { db } from '#services/db'

const orderValidator = vine.compile(
  vine.object({
    data: vine.array(vine.object({ id: vine.number(), order: vine.number() })),
  })
)

export default class SlidesController {
  async upload({ request, response }: HttpContext) {
    const image = request.file('file', {
      size: '2mb',
      extnames: ['jpeg', 'jpg', 'png'],
    })

    if (!image) {
      return response.badRequest({ error: 'Image missing' })
    }

    const key = `uploads/${cuid()}.${image.extname}`

    await image.moveToDisk(key)

    const lastSlide = await db.slides.query().select('order').orderBy('order', 'desc').first()
    const lastOrder = lastSlide?.order ? lastSlide.order + 1 : 1

    const slide = await db.slides.create({
      order: lastOrder,
      imageKey: key,
      imageUrl: await drive.use().getUrl(key),
    })

    transmit.broadcast('live/reload', ['slides'])

    return response.ok(slide)
  }

  async toggle({ params, response }: HttpContext) {
    const slide = await db.slides.findOrFail(params.id)

    if (slide.order === null) {
      const lastSlide = await db.slides.query().select('order').orderBy('order', 'desc').first()
      const lastOrder = lastSlide?.order ? lastSlide.order + 1 : 1

      slide.order = lastOrder
    } else {
      slide.order = null
    }

    await slide.save()

    transmit.broadcast('live/reload', ['slides'])

    return response.redirect().back()
  }

  async destroy({ params, response }: HttpContext) {
    const slide = await db.slides.findOrFail(params.id)

    await slide.delete()

    await drive.use().delete(slide.imageKey)

    return response.redirect().back()
  }

  async order({ request, response }: HttpContext) {
    const payload = await request.validateUsing(orderValidator)

    await db.slides.transaction(async (trx) => {
      for (const { id, order } of payload.data) {
        await db.slides.query({ client: trx }).where('id', id).update({ order })
      }
    })

    transmit.broadcast('live/reload', ['slides'])

    response.redirect().back()
  }
}
