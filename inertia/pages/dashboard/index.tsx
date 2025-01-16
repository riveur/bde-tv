import { Head } from '@inertiajs/react'
import { CalendarIcon, NewspaperIcon, WallpaperIcon } from 'lucide-react'

import { Page, PageTitle } from '@/components/page'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll_area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardLayout } from '@/layouts/dashboard'
import type { Event, New, Slide } from '@/types'
import { EventsTab } from './components/events_tab'
import { NewsTab } from './components/news_tab'
import { SlidesTab } from './components/slides_tab'

type DashboardPageProps = {
  news: New[]
  events: Event[]
  slides: Slide[]
}

export default function DashboardIndexPage(props: DashboardPageProps) {
  const { news, events, slides } = props

  return (
    <>
      <Head title="Tableau de bord" />
      <DashboardLayout>
        <Page>
          <PageTitle>Tableau de bord</PageTitle>
          <Tabs defaultValue="news">
            <ScrollArea>
              <TabsList className="mb-3">
                <TabsTrigger value="news">
                  <NewspaperIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>Actualités</span>
                  <Badge
                    className="ms-1.5 min-w-5 bg-primary/15 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                    variant="secondary"
                  >
                    {news.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="events" className="group">
                  <CalendarIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Agenda
                </TabsTrigger>
                <TabsTrigger value="slides" className="group">
                  <WallpaperIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Slides
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="news">
              <div className="flex flex-col gap-4">
                <NewsTab news={news} />
              </div>
            </TabsContent>
            <TabsContent value="events">
              <div className="flex flex-col gap-4">
                <EventsTab events={events} />
              </div>
            </TabsContent>
            <TabsContent value="slides">
              <SlidesTab slides={slides} />
            </TabsContent>
          </Tabs>
        </Page>
      </DashboardLayout>
    </>
  )
}
