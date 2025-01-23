import type { HttpContext } from '@adonisjs/core/http'

import { db } from '#services/db'

export default class AuthController {
  renderLogin({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    const user = await db.users.verifyCredentials(username, password)

    await auth.use('web').login(user)

    return response.redirect().toPath('/dashboard')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
