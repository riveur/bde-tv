import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Slide extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare order: number | null

  @column({ serializeAs: null })
  declare imageKey: string

  @column()
  declare imageUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
