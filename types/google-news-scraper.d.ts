/* eslint-disable @unicorn/filename-case */
declare module 'google-news-scraper' {
  type Timeframe = `${number}${'h' | 'd' | 'm' | 'y'}`
  export type QueryVars = Record<string, string>
  export type SearchParams =
    | {
        searchTerm: string
        baseUrl?: string
      }
    | {
        baseUrl: string
        searchTerm?: string
      }
  export type GNSUserConfig = SearchParams & {
    prettyURLs?: boolean
    timeframe?: Timeframe
    getArticleContent?: boolean
    puppeteerArgs?: string[]
    puppeteerHeadlessMode?: boolean
    logLevel?: LogLevel
    queryVars?: QueryVars
    filterWords?: string[]
    limit?: number
  }
  export type GNSConfig = SearchParams & {
    prettyURLs: boolean
    timeframe: Timeframe
    getArticleContent: boolean
    puppeteerArgs: string[]
    puppeteerHeadlessMode: boolean
    logLevel: LogLevel
    queryVars: QueryVars
    filterWords?: string[]
    limit: number
  }
  export type Article = {
    title: string
    link: string
    image: string
    source: string
    datetime: string
    time: string
    articleType: string
    content?: string
    favicon?: string
  }
  export type Articles = Article[]
  declare const googleNewsScraper: (userConfig: GNSUserConfig) => Promise<Article[]>
  export default googleNewsScraper
}
