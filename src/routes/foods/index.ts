import Elysia, { t } from 'elysia'
import { createFoodService } from './services/create-food.service'

const foodsRouter = new Elysia({ prefix: '/foods' })

foodsRouter.post('/', async ({ body, set }) => {
  await createFoodService(1, body)
  set.status = 201
  return { message: 'Food created' }
}, {
  body: t.Object({
    name: t.String({ minLength: 1 }),
    calories: t.Number({ min: 0 }),
    carbohydrate: t.Number({ min: 0 }),
    proteins: t.Number({ min: 0 }),
    fats: t.Number({ min: 0 })
  })
})

export { foodsRouter }