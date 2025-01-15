import BrokenClouds from '@/assets/weather/broken_clouds.png'
import FewClouds from '@/assets/weather/few_clouds.png'
import Mist from '@/assets/weather/mist.png'
import Rain from '@/assets/weather/rain.png'
import ShowerRain from '@/assets/weather/shower_rain.png'
import Snow from '@/assets/weather/snow.png'
import Sun from '@/assets/weather/sun.png'
import Thunderstrom from '@/assets/weather/thunderstorm.png'

import { cn } from '@/lib/utils'

export type IconProps = Omit<React.ComponentProps<'img'>, 'src'>

function iconFactory(src: string) {
  return function Icon({ className, ...props }: IconProps) {
    return <img src={src} className={cn('object-cover', className)} {...props} />
  }
}

export const BrokenCloudsIcon = iconFactory(BrokenClouds)
export const FewCloudsIcon = iconFactory(FewClouds)
export const MistIcon = iconFactory(Mist)
export const RainIcon = iconFactory(Rain)
export const ShowerRainIcon = iconFactory(ShowerRain)
export const SnowIcon = iconFactory(Snow)
export const SunIcon = iconFactory(Sun)
export const ThunderstromIcon = iconFactory(Thunderstrom)
