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
      name: t.String({ minLength: 1 }),
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 3 })
    })
  }
)

export { usersRouter }
