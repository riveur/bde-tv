import { DateTime } from 'luxon'
import { BaseModel, column, scope } from '@adonisjs/lucid/orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column.date()
  declare startAt: DateTime

  @column.date()
  declare endAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static incoming = scope((query) => {
    query.where('end_at', '>=', DateTime.utc().toSQLDate())
  })
}
