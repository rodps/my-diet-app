import { describe, expect, it } from 'bun:test'
import { createTestUser, getTestUser, url } from '../../utils'
import prisma from '../../../src/db'
import { app } from '../../../src'

const token = await createTestUser()
const testUser = await getTestUser()

describe('GET /foods', () => {
  it('should return 200 if foods are retrieved', async () => {
    // arrange
    const foods = [{
      name: 'test food',
      calories: 100,
      carbohydrate: 10,
      proteins: 10,
      fats: 10,
      userId: testUser.id
    }, {
      name: 'test food 2',
      calories: 200,
      carbohydrate: 20,
      proteins: 20,
      fats: 20,
      userId: testUser.id
    }]
    await prisma.food.createMany({ data: foods })

    // act
    const response = await app.handle(new Request(url('/foods'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }))

    // assert
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.length).toBe(2)
    expect(data[0].name).toBe(foods[0].name)
    expect(data[1].name).toBe(foods[1].name)
    expect(data[0].calories).toBe(foods[0].calories)
    expect(data[1].calories).toBe(foods[1].calories)
    expect(data[0].carbohydrate).toBe(foods[0].carbohydrate)
    expect(data[1].carbohydrate).toBe(foods[1].carbohydrate)
    expect(data[0].proteins).toBe(foods[0].proteins)
    expect(data[1].proteins).toBe(foods[1].proteins)
    expect(data[0].fats).toBe(foods[0].fats)
    expect(data[1].fats).toBe(foods[1].fats)
    expect(data[0].userId).toBe(foods[0].userId)
    expect(data[1].userId).toBe(foods[1].userId)
  })
})
