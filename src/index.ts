import { Elysia } from 'elysia'
import { usersRouter } from './routes/users'
import { ConflictError } from './errors/conflict.error'
import { foodsRouter } from './routes/foods'

const app = new Elysia({ prefix: '/api' })

app
  .error({
    ConflictError
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'ConflictError':
        set.status = 409
        return { message: error.message }
    }
  })

app.use(usersRouter)
app.use(foodsRouter)

app.listen(3000, () => {
  console.log('🦊 Elysia is running at 3000')
})

export { app }
