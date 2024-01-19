import { type Food } from '@prisma/client'
import prisma from '../../db'
import { type ICreateFoodData } from './services/create-food.service'

const saveFood = async (userId: number, data: ICreateFoodData): Promise<void> => {
  await prisma.food.create({
    data: { ...data, userId }
  })
}

const findAll = async (userId: number): Promise<Food[]> => {
  const foods = await prisma.food.findMany({ where: { userId } })
  return foods
}

export { saveFood, findAll }
