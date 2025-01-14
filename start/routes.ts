import router from '@adonisjs/core/services/router'

import { db } from '#services/db'
import { middleware } from '#start/kernel'

const NewsController = () => import('#controllers/news_controller')
const EventsController = () => import('#controllers/events_controller')

router.on('/').renderInertia('home')

router
  .get('/dashboard', async ({ inertia }) => {
    const news = await db.news.all()
    const events = await db.events.all()

    return inertia.render('dashboard/index', { news, events })
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
