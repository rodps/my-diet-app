import { Elysia } from 'elysia'
import { usersRouter } from './routes/users'
import { ConflictError } from './errors/conflict.error'

const app = new Elysia()

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

app.listen(3000, () => {
  console.log('🦊 Elysia is running at 3000')
})

export { app }
