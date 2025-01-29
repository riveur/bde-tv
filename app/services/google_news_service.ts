import googleNewsScraper from 'google-news-scraper'

import cache from '#cache/cache'

export class GoogleNewsService {
  async getArticles(searchTerm: string) {
    return cache.getOrSet({
      key: `google-news:${searchTerm}`,
      factory: async () => {
        const articles = await googleNewsScraper({
          searchTerm,
          prettyURLs: true,
          queryVars: { gl: 'FR', ceid: 'FR:fr' },
          limit: 10,
        })

        return await Promise.all(
          articles.map(async (article) => {
            article.image = await this.fetchImage(article.image)
            return article
          })
        )
      },
      ttl: '10min',
    })
  }

  private async fetchImage(url: string) {
    const response = await fetch(url)
    const buffer = Buffer.from(await response.arrayBuffer())
    return `data:${response.headers.get('content-type')};base64,${buffer.toString('base64')}`
  }
}
