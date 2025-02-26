import logger from '@adonisjs/core/services/logger'
import { errors as vineErrors } from '@vinejs/vine'
import ky from 'ky'
import { DateTime } from 'luxon'

import cache from '#cache/cache'
import env from '#start/env'
import { googleNewsArticlesValidator } from '#validators/serpapi_validator'

const API_KEY = env.get('SERPAPI_API_KEY')

export class GoogleNewsService {
  async getArticles(topicToken: string) {
    try {
      const articles = await cache.getOrSet({
        key: `google-news:${topicToken}`,
        factory: () => this.fetchArticles(topicToken),
        ttl: '8h',
      })

      return articles
    } catch (error: unknown) {
      if (error instanceof vineErrors.E_VALIDATION_ERROR) {
        logger.error({ err: error }, 'Failed to validate Google News articles')
      } else {
        logger.error({ err: error }, 'Failed to fetch Google News articles')
      }

      return null
    }
  }

  private async fetchArticles(topicToken: string) {
    if (!API_KEY || !topicToken) {
      return null
    }

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
      articles: articles.news_results
        .filter((article) => 'title' in article)
        .map((article) => ({
          ...article,
          date: this.parseDateToISO(article.date),
        })),
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
