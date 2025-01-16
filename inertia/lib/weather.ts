import {
  BrokenCloudsIcon,
  FewCloudsIcon,
  type IconProps,
  MistIcon,
  RainIcon,
  ShowerRainIcon,
  SnowIcon,
  SunIcon,
  ThunderstromIcon,
} from '@/components/icons'

const weatherConditions = ['Thunderstrom', 'Drizzle', 'Rain', 'Snow', 'Clear', 'Clouds'] as const

const atmosphereConditions = [
  'Mist',
  'Smoke',
  'Haze',
  'Dust',
  'Fog',
  'Sand',
  'Dust',
  'Ash',
  'Squall',
  'Tornado',
] as const

type WeatherCondition = (typeof weatherConditions)[number]
type AtmosphereCondition = (typeof atmosphereConditions)[number]

export function translateCondition(condition: string) {
  const translations: Record<WeatherCondition, string> = {
    Thunderstrom: 'Orageux',
    Drizzle: 'Bruine',
    Rain: 'Pluvieux',
    Snow: 'Enneigé',
    Clear: 'Dégagé',
    Clouds: 'Nuageux',
  }

  if (atmosphereConditions.includes(condition as AtmosphereCondition)) {
    return 'Brumeux'
  }

  return translations[condition as WeatherCondition] || condition
}

export const icons: Record<WeatherCondition, React.ComponentType<IconProps>> = {
  Thunderstrom: ThunderstromIcon,
  Drizzle: ShowerRainIcon,
  Rain: RainIcon,
  Snow: SnowIcon,
  Clear: SunIcon,
  Clouds: FewCloudsIcon,
}

export function getWeatherIcon(condition: string) {
  if (atmosphereConditions.includes(condition as AtmosphereCondition)) {
    return MistIcon
  }
  return icons[condition as WeatherCondition] || SunIcon
}
