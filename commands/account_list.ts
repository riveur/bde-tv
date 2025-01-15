import { db } from '#services/db'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class AccountList extends BaseCommand {
  static commandName = 'account:list'
  static description = 'To list all accounts'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const users = await db.users.query().select(['username'])

    if (!users.length) {
      this.logger.info('Aucun compte trouvé')
      return
    }

    const table = this.ui.table()

    table.head(["Nom d'utilisateur"])

    for (const user of users) {
      table.row([user.username])
    }

    table.render()
  }
}
