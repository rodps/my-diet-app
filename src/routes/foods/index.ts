import Elysia, { t } from 'elysia'
import { createFoodService } from './services/create-food.service'
import { bearerToken } from '../../middleware/bearer-token'
import { listFoodsService } from './services/list-foods.service'
import { updateFoodService } from './services/update-food.service'
import { deleteFoodService } from './services/delete-food.service'

const foodsRouter = new Elysia({ prefix: '/foods' })

foodsRouter
  .use(bearerToken)
  .post('/', async ({ user, body, set }) => {
    const food = await createFoodService(user.id, body)
    set.status = 201
    return { food }
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
    return { foods }
  })
  .put('/', async ({ user, body, set }) => {
    await updateFoodService(user.id, body)
    set.status = 200
    return { message: 'Food updated' }
  }, {
    body: t.Object({
      id: t.Number(),
      name: t.String({ minLength: 1 }),
      calories: t.Number({ min: 0 }),
      carbohydrate: t.Number({ min: 0 }),
      proteins: t.Number({ min: 0 }),
      fats: t.Number({ min: 0 })
    })
  })
  .delete('/:id', async ({ user, params, set }) => {
    await deleteFoodService(user.id, params.id)
    set.status = 200
    return { message: 'Food deleted' }
  }, {
    params: t.Object({
      id: t.Numeric()
    })
  })

export { foodsRouter }
