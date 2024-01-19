import { faker } from '@faker-js/faker'
import { describe, expect, it, mock, spyOn } from 'bun:test'
import { type IUpdateFoodData, updateFoodService } from './update-food.service'
import { NotFoundError } from 'elysia'

await mock.module('../repository', () => ({
  update: mock(() => {}),
  findOne: mock(() => ({
    id: faker.number.int(),
    name: faker.commerce.productName(),
    calories: faker.number.float(),
    carbohydrate: faker.number.float(),
    proteins: faker.number.float(),
    fats: faker.number.float(),
    userId: faker.number.int()
  }))
}))

const repository = await import('../repository')

describe('updateFood', () => {
  it('should update food with correct params', async () => {
    // arrange
    const userId = faker.number.int()
    const data: IUpdateFoodData = {
      id: faker.number.int(),
      name: faker.commerce.productName(),
      calories: faker.number.float(),
      carbohydrate: faker.number.float(),
      proteins: faker.number.float(),
      fats: faker.number.float(),
      userId
    }

    // act
    await updateFoodService(userId, data)

    // assert
    expect(repository.update).toHaveBeenCalledWith(userId, data)
  })

  it('should throw NotFoundError if food not found', async () => {
    // arrange
    const userId = faker.number.int()
    const data: IUpdateFoodData = {
      id: faker.number.int(),
      name: faker.commerce.productName(),
      calories: faker.number.float(),
      carbohydrate: faker.number.float(),
      proteins: faker.number.float(),
      fats: faker.number.float(),
      userId
    }
    spyOn(repository, 'findOne').mockResolvedValueOnce(null)

    // act
    const promise = updateFoodService(userId, data)

    // assert
    expect(promise).rejects.toThrow(new NotFoundError('Food not found'))
  })
})
