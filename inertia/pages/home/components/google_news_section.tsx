import { CalendarDaysIcon } from 'lucide-react'
import { Fragment } from 'react'

import type { Article } from '#validators/serpapi_validator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DateTime } from '@/lib/luxon'

interface GoogleNewsArticleProps {
  result: { title: string; articles: Article[] }
}

export function GoogleNewsSection({ result }: GoogleNewsArticleProps) {
  return (
    <Card className="flex flex-col flex-1 overflow-hidden">
      <CardHeader>
        <CardTitle>Faits divers : {result.title}</CardTitle>
      </CardHeader>
      <div className="relative overflow-y-hidden hover:overflow-y-auto flex-grow min-h-96">
        <CardContent className="absolute inset-0 flex flex-col p-0">
          {result.articles.map((article, index) => (
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

interface GoogleNewCardProps extends React.ComponentProps<typeof Card> {
  article: Article
}

function GoogleNewCard({ article, ...props }: GoogleNewCardProps) {
  return (
    <Card {...props}>
      <CardContent className="p-4 flex flex-row gap-4">
        <div className="flex-grow flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <p className="font-thin">{article.source.name}</p>
            <a
              className="font-semibold text-lg leading-none tracking-tight hover:underline"
              href={article.link}
            >
              {article.title}
            </a>
          </div>
          <CardDescription className="text-base flex items-center gap-2">
            <CalendarDaysIcon className="size-4" />
            <time dateTime={article.date}>{DateTime.fromISO(article.date).toRelative()}</time>
            {article.source.authors && `• ${article.source.authors.join(', ')}`}
          </CardDescription>
        </div>
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.source.name}
            className="min-w-64 h-32 object-center object-cover rounded-lg"
          />
        )}
      </CardContent>
    </Card>
  )
}
