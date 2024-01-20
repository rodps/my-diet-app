import { afterAll, describe, expect, it } from 'bun:test'
import { app } from '../../../src'
import { createTestUser, deleteTestData, getTestUserToken, url } from '../../utils'

const user = await createTestUser()
const token = await getTestUserToken()

describe('POST /foods', () => {
  afterAll(async () => {
    await deleteTestData()
  })

  it('should return 201 if food is created', async () => {
    // arrange
    const body = {
      name: 'test food',
      calories: 100,
      carbohydrate: 10,
      proteins: 10,
      fats: 10
    }

    // act
    const response = await app.handle(new Request(url('/foods'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }))
    const { food } = await response.json()

    // assert
    expect(response.status).toBe(201)
    expect(food.name).toBe(body.name)
    expect(food.calories).toBe(body.calories)
    expect(food.carbohydrate).toBe(body.carbohydrate)
    expect(food.proteins).toBe(body.proteins)
    expect(food.fats).toBe(body.fats)
    expect(food.userId).toBe(user.id)
  })

  it('should return 400 if body is invalid', async () => {
    const body = {}

    // act
    const response = await app.handle(
      new Request(url('/foods'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })
    )

    // assert
    expect(response.status).toBe(400)
  })
})
