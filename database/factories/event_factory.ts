import factory from '@adonisjs/lucid/factories'
import Event from '#models/event'
import { DateTime } from 'luxon'

export const EventFactory = factory
  .define(Event, async ({ faker }) => {
    const startAt = faker.date.future()

    return {
      title: faker.lorem.sentence(5),
      startAt: DateTime.fromJSDate(startAt),
      endAt: DateTime.fromJSDate(startAt).plus({ days: faker.number.int({ max: 3, min: 0 }) }),
    }
  })
  .build()
