import { Elysia, t } from 'elysia'

const app = new Elysia()

app.post('/users', ({ body: { name, email, password } }) => {
  return {
    name,
    email,
    password
  }
}, {
  body: t.Object({
    name: t.String({ minLength: 1 }),
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 3 })
  })
})

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
