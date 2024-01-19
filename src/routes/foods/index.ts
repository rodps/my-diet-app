import Elysia, { t } from 'elysia'
import { createFoodService } from './services/create-food.service'
import { bearerToken } from '../../middleware/bearer-token'
import { listFoodsService } from './services/list-foods.service'

const foodsRouter = new Elysia({ prefix: '/foods' })

foodsRouter
  .use(bearerToken)
  .post('/', async ({ user, body, set }) => {
    await createFoodService(user.id, body)
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
  .get('/', async ({ user, set }) => {
    const foods = await listFoodsService(user.id)
    set.status = 200
    return foods
  })

export { foodsRouter }
