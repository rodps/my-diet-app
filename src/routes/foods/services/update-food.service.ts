import { NotFoundError } from 'elysia'
import { findOne, update } from '../repository'

interface IUpdateFoodData {
  id: number
  name: string
  calories: number
  carbohydrate: number
  proteins: number
  fats: number
}

const updateFoodService = async (userId: number, data: IUpdateFoodData): Promise<void> => {
  const doesExist = await findOne(userId, data.id)
  if (doesExist == null) {
    throw new NotFoundError('Food not found')
  }
  await update(userId, data)
}

export { updateFoodService, type IUpdateFoodData }
