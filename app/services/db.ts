import EventModel from '#models/event'
import New from '#models/new'
import Slide from '#models/slide'
import User from '#models/user'

export const db = {
  users: User,
  news: New,
  events: EventModel,
  slides: Slide,
} as const
