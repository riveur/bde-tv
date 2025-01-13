import factory from '@adonisjs/lucid/factories'
import New from '#models/new'

export const NewFactory = factory
  .define(New, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(5),
      description: faker.lorem.paragraphs(3),
      level: faker.string.fromCharacters(['low', 'medium', 'high']) as 'low' | 'medium' | 'high',
    }
  })
  .build()
