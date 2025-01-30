import vine, { SimpleErrorReporter } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const googleNewsArticlesValidator = vine.compile(
  vine.object({
    title: vine.string(),
    news_results: vine.array(
      vine.object({
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
    ),
  })
)

googleNewsArticlesValidator.errorReporter = () => new SimpleErrorReporter()

export type Article = Infer<typeof googleNewsArticlesValidator>['news_results'][number]
