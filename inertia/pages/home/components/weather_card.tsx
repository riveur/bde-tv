import { CloudIcon, DropletsIcon, ThermometerIcon, WindIcon } from 'lucide-react'

import type { WeatherData } from '#services/weather_service'
import { getWeatherIcon, translateCondition } from '@/lib/weather'

interface WeatherCardProps {
  weather: WeatherData | null
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const Icon = getWeatherIcon(weather?.weather[0].main || '')
  return (
    <div className="flex flex-col gap-2 h-full">
      {weather === null && (
        <div className="flex items-center justify-center flex-grow">
          <span>Indisponible pour le moment</span>
        </div>
      )}
      {weather && (
        <>
          <div className="flex flex-col items-center justify-center gap-2 flex-grow">
            <h1 className="text-3xl font-bold">{weather.name}</h1>
            <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <div className="flex flex-col items-center gap-2">
              <Icon className="h-32 w-auto" />
              <p className="capitalize">{translateCondition(weather.weather[0].main)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border p-4 rounded-lg flex items-center gap-3">
              <ThermometerIcon className="text-sky-500" />
              <div>
                <p className="text-sm">Ressenti</p>
                <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg flex items-center gap-3">
              <DropletsIcon className="text-orange-500" />
              <div>
                <p className="text-sm">Humidité</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg flex items-center gap-3">
              <WindIcon className="text-zinc-500" />
              <div>
                <p className="text-sm">Vitesse du vent</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg flex items-center gap-3">
              <CloudIcon />
              <div>
                <p className="text-sm">Conditions</p>
                <p className="font-semibold capitalize">
                  {translateCondition(weather.weather[0].main)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
