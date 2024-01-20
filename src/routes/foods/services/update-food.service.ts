import { NotFoundError } from 'elysia'
import { findOne, update } from '../repository'
import { type Food } from '@prisma/client'

interface IUpdateFoodData {
  id: number
  name: string
  calories: number
  carbohydrate: number
  proteins: number
  fats: number
}

const updateFoodService = async (userId: number, data: IUpdateFoodData): Promise<Food> => {
  const doesExist = await findOne(userId, data.id)
  if (doesExist == null) {
    throw new NotFoundError('Food not found')
  }
  return await update(userId, data)
}

export { updateFoodService, type IUpdateFoodData }
