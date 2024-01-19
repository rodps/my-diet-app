import { NotFoundError } from 'elysia'
import { deleteFood, findOne } from '../repository'

const deleteFoodService = async (userId: number, id: number): Promise<void> => {
  const doesExist = await findOne(userId, id)
  if (doesExist == null) {
    throw new NotFoundError('Food not found')
  }
  await deleteFood(userId, id)
}

export { deleteFoodService }
