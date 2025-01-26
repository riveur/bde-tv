import { usePage } from '@inertiajs/react'
import { CalendarDaysIcon } from 'lucide-react'
import { Fragment } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppSettings } from '@/hooks/use_app_settings'
import type { Article } from '@/types'

export function GoogleNewsSection() {
  const articles = usePage().props.googleNews as Article[]
  const settings = useAppSettings()

  if (!articles) {
    return null
  }

  return (
    <Card className="flex flex-col flex-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Faits divers : {settings.weatherCity}</CardTitle>
      </CardHeader>
      <div className="relative overflow-y-hidden hover:overflow-y-auto flex-grow min-h-96">
        <CardContent className="absolute inset-0 flex flex-col p-0">
          {articles.map((article, index) => (
            <Fragment key={index}>
              <GoogleNewCard className="border-0" article={article} />
              <Separator />
            </Fragment>
          ))}
        </CardContent>
      </div>
    </Card>
  )
}

export function GoogleNewsSectionSkeleton() {
  const settings = useAppSettings()

  return (
    <Card className="flex flex-col flex-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Faits divers : {settings.weatherCity}</CardTitle>
      </CardHeader>
      <div className="relative overflow-y-hidden hover:overflow-y-auto flex-grow min-h-96">
        <CardContent className="absolute inset-0 flex flex-col p-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              <Skeleton className="w-full h-40 rounded-none" />
              <Separator className="bg-background" />
            </Fragment>
          ))}
        </CardContent>
      </div>
    </Card>
  )
}

interface GoogleNewCardProps extends React.ComponentProps<typeof Card> {
  article: Article
}

function GoogleNewCard({ article, ...props }: GoogleNewCardProps) {
  return (
    <Card {...props}>
      <CardContent className="p-4 flex flex-row gap-4">
        <div className="flex-grow flex flex-col justify-between">
          <div className="space-y-1.5">
            <p className="font-thin">{article.source}</p>
            <a
              className="font-semibold text-lg leading-none tracking-tight hover:underline"
              href={article.link}
            >
              {article.title}
            </a>
          </div>
          <CardDescription className="text-base flex items-center gap-2">
            <CalendarDaysIcon className="size-4" />
            <time dateTime={article.datetime}>{article.time}</time>
          </CardDescription>
        </div>
        <img
          src={article.image}
          alt={article.source}
          className="min-w-64 h-32 object-center object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  )
}
