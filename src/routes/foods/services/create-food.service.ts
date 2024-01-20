import { type Food } from '@prisma/client'
import { saveFood } from '../repository'

interface ICreateFoodData {
  name: string
  calories: number
  carbohydrate: number
  proteins: number
  fats: number
}

const createFoodService = async (userId: number, data: ICreateFoodData): Promise<Food> => {
  return await saveFood(userId, data)
}

export { createFoodService, type ICreateFoodData }
