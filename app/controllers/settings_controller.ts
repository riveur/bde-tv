import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

import { SettingRepository } from '#repositories/setting_repository'
import { settingValidator } from '#validators/setting_validator'

@inject()
export default class SettingsController {
  constructor(private settingRepository: SettingRepository) {}

  async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(settingValidator)

    await this.settingRepository.update(payload)

    transmit.broadcast('live/reload', ['appSettings'])

    return response.redirect().back()
  }
}
