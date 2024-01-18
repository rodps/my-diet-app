import Elysia, { t } from 'elysia'
import { createUserService } from './services/create-user.service'

const usersRouter = new Elysia({ prefix: '/users' })

usersRouter.post(
  '/',
  async ({ body, set }) => {
    await createUserService(body)
    set.status = 201
    return { message: 'User created' }
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  }
)

export { usersRouter }
