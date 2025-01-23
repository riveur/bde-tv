import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('app_name').notNullable()
      table.integer('refresh_interval').notNullable()
      table.integer('carousel_interval').notNullable()
      table.string('weather_city').notNullable()
      table.string('weather_ttl').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
