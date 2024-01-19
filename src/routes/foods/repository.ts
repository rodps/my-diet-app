import { type Food } from '@prisma/client'
import prisma from '../../db'
import { type ICreateFoodData } from './services/create-food.service'
import { type IUpdateFoodData } from './services/update-food.service'

const saveFood = async (userId: number, data: ICreateFoodData): Promise<void> => {
  await prisma.food.create({
    data: { ...data, userId }
  })
}

const findAll = async (userId: number): Promise<Food[]> => {
  const foods = await prisma.food.findMany({ where: { userId } })
  return foods
}

const findOne = async (userId: number, id: number): Promise<Food | null> => {
  const food = await prisma.food.findFirst({ where: { id, userId } })
  return food
}

const update = async (userId: number, data: IUpdateFoodData): Promise<void> => {
  await prisma.food.update({ where: { id: data.id, userId }, data })
}

const deleteFood = async (userId: number, id: number): Promise<void> => {
  await prisma.food.delete({ where: { id, userId } })
}

export { saveFood, findAll, update, findOne, deleteFood }
