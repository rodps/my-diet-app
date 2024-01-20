import { describe, expect, it, mock, spyOn } from 'bun:test'
import { type ICreateFoodData, createFoodService } from './create-food.service'
import { faker } from '@faker-js/faker'

await mock.module('../repository', () => ({
  saveFood: mock(() => {})
}))

const repository = await import('../repository')

describe('createFood', () => {
  it('should save food with correct params', async () => {
    // arrange
    const userId = faker.number.int()
    const data: ICreateFoodData = {
      name: faker.commerce.productName(),
      calories: faker.number.int(),
      carbohydrate: faker.number.int(),
      proteins: faker.number.int(),
      fats: faker.number.int()
    }
    const saveFoodSpy = spyOn(repository, 'saveFood')
      .mockResolvedValueOnce({ ...data, id: faker.number.int(10), userId })

    // act
    const food = await createFoodService(userId, data)

    // assert
    expect(saveFoodSpy).toHaveBeenCalledWith(userId, data)
    expect(food).toEqual({ ...data, id: expect.any(Number), userId })
  })
})
