import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

import { SettingRepository } from '#repositories/setting_repository'

@inject()
export default class SettingMiddleware {
  constructor(private settingRepository: SettingRepository) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const appSettings = async () => {
      const data = await this.settingRepository.get()
      return data.serialize()
    }
    ctx.inertia.share({ appSettings })

    await next()
  }
}
