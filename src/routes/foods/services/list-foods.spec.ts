import { type Food } from '@prisma/client'
import { describe, expect, it, mock, spyOn } from 'bun:test'
import { listFoodsService } from './list-foods.service'

await mock.module('../repository', () => ({
  findAll: mock(() => {
    return []
  })
}))

const repository = await import('../repository')

describe('listFoods', () => {
  it('should return a list of foods', async () => {
    // arrange
    const foods: Food[] = [
      {
        id: 1,
        name: 'test',
        calories: 0,
        carbohydrate: 0,
        proteins: 0,
        fats: 0,
        userId: 1
      }
    ]
    const findAllSpy = spyOn(repository, 'findAll').mockResolvedValueOnce(foods)

    // act
    const userId = 1
    const result = await listFoodsService(userId)

    expect(result).toEqual(foods)
    expect(findAllSpy).toHaveBeenCalledWith(userId)
  })
})
