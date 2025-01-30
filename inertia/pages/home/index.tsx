import { usePoll } from '@inertiajs/react'
import Autoplay from 'embla-carousel-autoplay'
import { NewspaperIcon } from 'lucide-react'

import type { WeatherData } from '#services/weather_service'
import type { Article } from '#validators/serpapi_validator'
import { Head } from '@/components/head'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useAppSettings } from '@/hooks/use_app_settings'
import { cn } from '@/lib/utils'
import type { Event, New, Slide } from '@/types'
import { EventsTimeline } from './components/events_timeline'
import { GoogleNewsSection } from './components/google_news_section'
import { HomeHeader } from './components/home_header'
import { NewCard } from './components/new_card'
import { WeatherCard } from './components/weather_card'
import { useLiveReload } from './hooks/use_live_reload'

type HomePageProps = {
  news: New[]
  events: Event[]
  slides: Slide[]
  weather: WeatherData | null
  googleNews: { title: string; articles: Article[] } | null
}

export default function HomePage(props: HomePageProps) {
  const { news, events, slides, weather, googleNews } = props

  const settings = useAppSettings()

  usePoll(settings.refreshInterval * 60 * 1000)
  useLiveReload()

  return (
    <>
      <Head title="Accueil" />
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: settings.carouselInterval * 1000 })]}
      >
        <CarouselContent className="items-center">
          <CarouselItem>
            <section className="min-h-dvh w-full flex flex-col gap-8 p-8">
              <HomeHeader />
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-8 gap-8 flex-1">
                <Card className="col-span-1 xl:col-span-4 flex flex-col">
                  <CardHeader className="p-4">
                    <CardTitle>Dernières actualités</CardTitle>
                  </CardHeader>
                  <div className="relative overflow-y-hidden hover:overflow-y-auto flex-grow min-h-96">
                    <CardContent
                      className={cn(
                        'absolute inset-0 p-2 pt-0 flex flex-col gap-2',
                        news.length === 0 && 'items-center justify-center'
                      )}
                    >
                      {news.length === 0 && (
                        <>
                          <NewspaperIcon className="size-24" />
                          <p>Aucune actualité pour le moment</p>
                        </>
                      )}
                      {news.length !== 0 &&
                        news.map((item) => <NewCard key={item.id} new={item} />)}
                    </CardContent>
                  </div>
                </Card>
                <Card className="col-span-1 xl:col-span-2 xl:col-start-7 flex flex-col">
                  <CardHeader className="p-4">
                    <CardTitle>Météo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 flex-grow">
                    <WeatherCard weather={weather} />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>&Eacute;vènements à venir</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <EventsTimeline events={events} />
                </CardContent>
              </Card>
            </section>
          </CarouselItem>
          {googleNews && (
            <CarouselItem>
              <section className="min-h-dvh container mx-auto max-w-6xl flex p-8">
                <GoogleNewsSection result={googleNews} />
              </section>
            </CarouselItem>
          )}
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="h-dvh overflow-hidden flex">
                <div className="flex items-center justify-center flex-1">
                  <img src={slide.imageUrl} className="w-full h-auto object-center object-cover" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}
