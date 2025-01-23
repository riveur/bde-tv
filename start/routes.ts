import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

import { middleware } from '#start/kernel'

const SettingsController = () => import('#controllers/settings_controller')
const AuthController = () => import('#controllers/auth_controller')
const HomeController = () => import('#controllers/home_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const SlidesController = () => import('#controllers/slides_controller')
const NewsController = () => import('#controllers/news_controller')
const EventsController = () => import('#controllers/events_controller')

transmit.registerRoutes()

router.get('/', [HomeController])
router.get('/dashboard', [DashboardController]).middleware(middleware.auth())

router.get('/login', [AuthController, 'renderLogin']).middleware(middleware.guest())
router.post('/login', [AuthController, 'login']).middleware(middleware.guest())
router.post('/logout', [AuthController, 'logout']).middleware(middleware.auth())

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

router.put('/settings', [SettingsController]).middleware(middleware.auth())
