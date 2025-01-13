import { EventFactory } from '#database/factories/event_factory'
import { NewFactory } from '#database/factories/new_factory'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({ username: 'admin', password: 'password' })
    await NewFactory.createMany(10)
    await EventFactory.createMany(10)
  }
}
