import vine, { SimpleErrorReporter } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

const article = vine.object({
  position: vine.number(),
  title: vine.string(),
  source: vine.object({
    name: vine.string(),
    icon: vine.string(),
    authors: vine.array(vine.string()).optional(),
  }),
  link: vine.string(),
  thumbnail: vine.string().optional(),
  date: vine.string(),
})

const story = vine.object({
  position: vine.number(),
  highlight: vine.any(),
  stories: vine.array(vine.any()),
  story_token: vine.string(),
  serpapi_link: vine.string(),
})

export const googleNewsArticlesValidator = vine.compile(
  vine.object({
    title: vine.string(),
    news_results: vine.array(
      vine.union([
        vine.union.if((value) => vine.helpers.isObject(value) && 'title' in value, article),
        vine.union.if((value) => vine.helpers.isObject(value) && 'highlight' in value, story),
      ])
    ),
  })
)

googleNewsArticlesValidator.errorReporter = () => new SimpleErrorReporter()

export type Article = Infer<typeof googleNewsArticlesValidator>['news_results'][number]
