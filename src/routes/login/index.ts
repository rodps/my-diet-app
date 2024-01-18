import { Elysia, t } from 'elysia'
import { loginService } from './services/login.service'

const loginRouter = new Elysia()

loginRouter.post('/login', async ({ body: { email, password } }) => {
  const token = await loginService(email, password)
  return { token }
}, {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String()
  })
})

export { loginRouter }
