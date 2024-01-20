import { describe, expect, it } from 'bun:test'
import { app } from '../../../src'
import { getTestUserToken, url } from '../../utils'

const token = await getTestUserToken()

describe('DELETE /foods/:id', () => {
  it('should return 200 if food is deleted', async () => {
    // arrange
    const food = {
      name: 'test food',
      calories: 100,
      carbohydrate: 10,
      proteins: 10,
      fats: 10
    }

    const postResponse = await app.handle(new Request(url('/foods'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(food)
    }))

    if (postResponse.status !== 201) throw new Error('Failed to create food')
    const { food: createdFood } = await postResponse.json()

    // act
    const deleteResponse = await app.handle(new Request(url(`/foods/${createdFood.id}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }))

    // assert
    expect(deleteResponse.status).toBe(200)
  })

  it('should return 404 if food is not found', async () => {
    // arrange
    const id = 1234

    // act
    const response = await app.handle(new Request(url(`/foods/${id}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }))

    // assert
    expect(response.status).toBe(404)
  })
})
