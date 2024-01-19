import { type Food } from '@prisma/client'
import { findAll } from '../repository'

const listFoodsService = async (userId: number): Promise<Food[]> => {
  const foods = await findAll(userId)
  return foods
}

export { listFoodsService }
