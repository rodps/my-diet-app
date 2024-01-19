import { Elysia } from 'elysia'
import {
  ConflictError,
  UnauthorizedError
} from './errors'
import { usersRouter } from './routes/users'
import { foodsRouter } from './routes/foods'
import { loginRouter } from './routes/login'

const app = new Elysia({ prefix: '/api' })

app
  .error({
    ConflictError,
    UnauthorizedError
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'ConflictError':
        set.status = 409
        return { message: error.message }
      case 'UnauthorizedError':
        set.status = 401
        return { message: error.message }
    }
    console.log(error)
  })

app.use(usersRouter)
app.use(loginRouter)
app.use(foodsRouter)

app.listen(3000, () => {
  console.log('🦊 Elysia is running at 3000')
})

export { app }
