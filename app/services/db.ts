import New from '#models/new'
import User from '#models/user'
import EventModel from '#models/event'

export const db = {
  users: User,
  news: New,
  events: EventModel,
} as const
