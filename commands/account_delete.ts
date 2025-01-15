import { db } from '#services/db'
import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class AccountDelete extends BaseCommand {
  static commandName = 'account:delete'
  static description = 'To delete an account'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: 'The username of the account to delete' })
  declare username: string

  async run() {
    const confirm = await this.prompt.confirm(
      `Êtes-vous sûr de vouloir supprimer le compte ${this.username} ?`
    )

    if (!confirm) {
      return
    }

    const animation = this.logger.await('Suppression du compte')
    animation.start()

    const user = await db.users.findBy('username', this.username)

    if (!user) {
      animation.stop()
      this.logger.error('Compte introuvable')
      return
    }

    await user.delete()
    animation.stop()
    this.logger.success('Compte supprimé avec succès')
  }
}
