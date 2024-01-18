import prisma from '../../db'
import { type ICreateFoodData } from './services/create-food.service'

const saveFood = async (userId: number, data: ICreateFoodData): Promise<void> => {
  await prisma.food.create({
    data: { ...data, userId }
  })
}

export { saveFood }
