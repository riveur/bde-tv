import { db } from '#services/db'
import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class AccountPasswd extends BaseCommand {
  static commandName = 'account:passwd'
  static description = 'To change the password of an account'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: 'The username of the account to change the password' })
  declare username: string

  async run() {
    const user = await db.users.findBy('username', this.username)

    if (!user) {
      this.logger.error('Compte introuvable')
      return
    }

    const password = await this.prompt.secure('Entrez un nouveau mot de passe:', {
      validate(value: string) {
        if (!value) {
          return 'Le mot de passe ne peut pas être vide'
        }
        return true
      },
    })

    await this.prompt.secure('Confirmez le mot de passe:', {
      validate(value: string) {
        if (value !== password) {
          return 'Les mots de passe ne correspondent pas'
        }
        return true
      },
    })

    const animation = this.logger.await('Changement du mot de passe')
    animation.start()

    await user.merge({ password }).save()
    animation.stop()

    this.logger.success('Mot de passe changé avec succès')
  }
}
