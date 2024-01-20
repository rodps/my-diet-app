import { describe, expect, it } from 'bun:test'
import { getTestUserToken, url } from '../../utils'
import { app } from '../../../src'

const token = await getTestUserToken()

describe('PUT /foods/:id', () => {
  it('should return 200 if food is updated', async () => {
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
    const putResponse = await app.handle(new Request(url(`/foods/${createdFood.id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'updated food',
        calories: 200,
        carbohydrate: 20,
        proteins: 20,
        fats: 20
      })
    }))

    // assert
    expect(putResponse.status).toBe(200)
    const data = await putResponse.json()
    expect(data.food.name).toBe('updated food')
    expect(data.food.calories).toBe(200)
    expect(data.food.carbohydrate).toBe(20)
    expect(data.food.proteins).toBe(20)
    expect(data.food.fats).toBe(20)
  })
})
