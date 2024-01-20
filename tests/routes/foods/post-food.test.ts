import { afterAll, describe, expect, it } from 'bun:test'
import { app } from '../../../src'
import { createTestUser, deleteTestUser, url } from '../../utils'

const token = await createTestUser()

describe('POST /foods', () => {
  afterAll(async () => {
    await deleteTestUser()
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

    // assert
    expect(response.status).toBe(201)
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
