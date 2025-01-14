import { Head } from '@inertiajs/react'
import { CalendarIcon, NewspaperIcon } from 'lucide-react'

import { type db } from '#services/db'
import { Page, PageTitle } from '@/components/page'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll_area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardLayout } from '@/layouts/dashboard'

type DashboardPageProps = {
  news: InstanceType<typeof db.news>[]
  events: InstanceType<typeof db.events>[]
}

export default function DashboardPage(props: DashboardPageProps) {
  const { news, events } = props

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
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="news">
              <pre>{JSON.stringify(news, null, 2)}</pre>
            </TabsContent>
            <TabsContent value="events">
              <pre>{JSON.stringify(events, null, 2)}</pre>
            </TabsContent>
          </Tabs>
        </Page>
      </DashboardLayout>
    </>
  )
}
