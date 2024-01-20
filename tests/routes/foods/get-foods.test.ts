import { describe, expect, it } from 'bun:test'
import { getTestUserToken, url } from '../../utils'
import { app } from '../../../src'

const token = await getTestUserToken()

describe('GET /foods', () => {
  it('should return 200 if foods are retrieved', async () => {
    // arrange
    const foods = []
    for (const i of [1, 2, 3]) {
      const food = {
        name: `test food ${i}`,
        calories: i,
        carbohydrate: i,
        proteins: i,
        fats: i
      }
      const response = await app.handle(new Request(url('/foods'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(food)
      }))
      if (response.status !== 201) throw new Error('Failed to create food')
      foods.push(food)
    }

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
    console.log(data)
    expect(data.foods.length).toBe(3)
    for (let i = 0; i < 3; i++) {
      expect(data.foods[i].id).toBeTruthy()
      expect(data.foods[i].name).toBe(foods[i].name)
      expect(data.foods[i].calories).toBe(foods[i].calories)
      expect(data.foods[i].carbohydrate).toBe(foods[i].carbohydrate)
      expect(data.foods[i].proteins).toBe(foods[i].proteins)
      expect(data.foods[i].fats).toBe(foods[i].fats)
    }
  })
})
