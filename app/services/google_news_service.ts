import ky from 'ky'
import { DateTime } from 'luxon'

import cache from '#cache/cache'
import env from '#start/env'
import { googleNewsArticlesValidator } from '#validators/serpapi_validator'

const API_KEY = env.get('SERPAPI_API_KEY')

export class GoogleNewsService {
  async getArticles(topicToken: string) {
    if (!API_KEY || !topicToken) {
      return null
    }

    try {
      return cache.getOrSet({
        key: `google-news:${topicToken}`,
        factory: async () => {
          const response = await ky.get('https://serpapi.com/search.json', {
            searchParams: {
              engine: 'google_news',
              gl: 'FR',
              hl: 'fr',
              topic_token: topicToken,
              api_key: API_KEY,
            },
          })

          const data = await response.json()
          const articles = await googleNewsArticlesValidator.validate(data)

          return {
            title: articles.title,
            articles: articles.news_results.map((article) => ({
              ...article,
              date: this.parseDateToISO(article.date),
            })),
          }
        },
        ttl: '8h',
      })
    } catch (error: unknown) {
      return null
    }
  }

  private parseDateToISO(date: string) {
    const format = 'MM/dd/yyyy, hh:mm a, ZZZ'

    if (date.length > format.length) {
      date = date.slice(0, format.length)
    }

    const parsedDate = DateTime.fromFormat(date, format, { locale: 'en' }).toISO()
    return parsedDate || date
  }
}
