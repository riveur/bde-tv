import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare appName: string

  @column()
  declare refreshInterval: number

  @column()
  declare carouselInterval: number

  @column()
  declare weatherCity: string

  @column()
  declare weatherTtl: string
}
