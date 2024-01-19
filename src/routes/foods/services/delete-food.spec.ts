import { faker } from '@faker-js/faker'
import { describe, expect, it, mock, spyOn } from 'bun:test'
import { deleteFoodService } from './delete-food.service'
import { NotFoundError } from 'elysia'

await mock.module('../repository', () => ({
  deleteFood: mock(() => {}),
  findOne: mock(() => null)
}))

const repository = await import('../repository')

describe('deleteFood', () => {
  it('should delete food with correct params', async () => {
    // arrange
    const userId = faker.number.int(100)
    const id = faker.number.int(100)
    spyOn(repository, 'findOne').mockResolvedValueOnce({
      id,
      name: faker.commerce.productName(),
      calories: faker.number.float(),
      carbohydrate: faker.number.float(),
      proteins: faker.number.float(),
      fats: faker.number.float(),
      userId
    })

    // act
    await deleteFoodService(userId, id)

    // assert
    expect(repository.deleteFood).toHaveBeenCalledWith(userId, id)
    expect(repository.deleteFood).toHaveBeenCalledTimes(1)
    expect(repository.findOne).toHaveBeenCalledWith(userId, id)
  })

  it('should throw NotFoundError if food not found', async () => {
    // arrange
    const userId = faker.number.int(100)
    const id = faker.number.int(100)
    spyOn(repository, 'findOne').mockResolvedValueOnce(null)

    // act
    const promise = deleteFoodService(userId, id)

    // assert
    expect(promise).rejects.toThrow(new NotFoundError('Food not found'))
  })
})
