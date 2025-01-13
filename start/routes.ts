import router from '@adonisjs/core/services/router'

import { db } from '#services/db'
import { middleware } from '#start/kernel'

router.on('/').renderInertia('home')

router
  .get('/dashboard', async ({ inertia }) => {
    const news = await db.news.all()
    const events = await db.events.all()

    return inertia.render('dashboard', { news, events })
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
