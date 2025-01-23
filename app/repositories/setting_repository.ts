import { db } from '#services/db'
import type { SettingData } from '#validators/setting_validator'

const DEFAULT_SETTINGS = {
  appName: 'Clear Frame',
  refreshInterval: 30,
  carouselInterval: 5,
  weatherCity: 'Paris',
  weatherTtl: '30min',
}

export class SettingRepository {
  public async get() {
    return db.settings.firstOrCreate({}, DEFAULT_SETTINGS)
  }

  public async getSetting<T extends keyof SettingData>(key: T) {
    const setting = await this.get()
    return setting[key] as SettingData[T]
  }

  public async update(payload: Partial<SettingData>) {
    const setting = await this.get()
    setting.merge(payload)
    await setting.save()

    return setting
  }
}
