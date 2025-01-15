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

export function translateCondition(condition: string) {
  const translations = {
    'clear sky': 'ciel dégagé',
    'few clouds': 'peu nuageux',
    'scattered clouds': 'nuages épars',
    'broken clouds': 'nuages épars',
    'shower rain': 'averses',
    'rain': 'pluvieux',
    'thunderstorm': 'orageux',
    'snow': 'enneigé',
    'mist': 'brumeux',
  } as Record<string, string>

  return translations[condition] || condition
}

export const icons = {
  'clear sky': SunIcon,
  'few clouds': FewCloudsIcon,
  'scattered clouds': BrokenCloudsIcon,
  'broken clouds': BrokenCloudsIcon,
  'shower rain': ShowerRainIcon,
  'rain': RainIcon,
  'thunderstorm': ThunderstromIcon,
  'snow': SnowIcon,
  'mist': MistIcon,
} as Record<string, React.ComponentType<IconProps>>

export function getWeatherIcon(condition: string) {
  return icons[condition] || SunIcon
}
