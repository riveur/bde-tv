import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'

import { db } from '#services/db'
import { WeatherService } from '#services/weather_service'
import env from '#start/env'
import { middleware } from '#start/kernel'
import transmit from '@adonisjs/transmit/services/main'

const SlidesController = () => import('#controllers/slides_controller')
const NewsController = () => import('#controllers/news_controller')
const EventsController = () => import('#controllers/events_controller')

transmit.registerRoutes()

router.get('/', async ({ inertia }) => {
  const news = () => db.news.query().orderBy('created_at', 'desc').limit(3)
  const events = () =>
    db.events
      .query()
      .withScopes((scopes) => scopes.incoming())
      .orderBy('start_at', 'asc')
      .limit(5)
  const slides = () => db.slides.query().whereNotNull('order').orderBy('order', 'asc')

  const weatherService = await app.container.make(WeatherService)
  const weather = await weatherService.getWeather(env.get('OPENWEATHER_CITY') || 'Paris')
  const carouselDelay = env.get('CAROUSEL_DELAY')

  return inertia.render('home/index', { news, events, slides, weather, carouselDelay })
})

router
  .get('/dashboard', async ({ inertia }) => {
    const news = () => db.news.all()
    const events = () => db.events.all()
    const slides = () => db.slides.query().orderBy('order', 'asc')

    return inertia.render('dashboard/index', { news, events, slides })
  })
  .as('dashboard')
  .middleware(middleware.auth())

router.get('/login', ({ inertia }) => inertia.render('login')).middleware(middleware.guest())

router
  .post('/login', async ({ request, auth, response }) => {
    const { username, password } = request.only(['username', 'password'])

    const user = await db.users.verifyCredentials(username, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard')
  })
  .middleware(middleware.guest())

router
  .post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [EventsController, 'create'])
    router.put('/:id', [EventsController, 'update'])
    router.delete('/:id', [EventsController, 'delete'])
  })
  .prefix('/events')
  .middleware(middleware.auth())

router
  .group(() => {
    router.post('/', [NewsController, 'create'])
    router.put('/:id', [NewsController, 'update'])
    router.delete('/:id', [NewsController, 'delete'])
  })
  .prefix('/news')
  .middleware(middleware.auth())

router
  .group(() => {
    router.post('/upload', [SlidesController, 'upload'])
    router.post('/:id/toggle', [SlidesController, 'toggle'])
    router.delete('/:id', [SlidesController, 'destroy'])
    router.post('/order', [SlidesController, 'order'])
  })
  .prefix('/slides')
  .middleware(middleware.auth())
