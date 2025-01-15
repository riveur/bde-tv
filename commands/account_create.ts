import { db } from '#services/db'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class AccountCreate extends BaseCommand {
  static commandName = 'account:create'
  static description = 'To create an account'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const username = await this.prompt.ask("Entrez un nom d'utilisateur:", {
      async validate(value: string) {
        if (!value) {
          return "Le nom d'utilisateur ne peut pas être vide"
        }
        if (await db.users.findBy('username', value)) {
          return "Le nom d'utilisateur est déjà pris"
        }
        return true
      },
    })

    const password = await this.prompt.secure('Entrez un mot de passe:', {
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

    const animation = this.logger.await('Création du compte')
    animation.start()
    await db.users.create({ username, password })
    animation.stop()
    this.logger.success('Compte créé avec succès')
  }
}
