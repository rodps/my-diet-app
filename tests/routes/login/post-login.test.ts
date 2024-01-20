import { describe, expect, it } from 'bun:test'
import { createTestUser, url } from '../../utils'
import { app } from '../../../src'

const user = await createTestUser()

describe('POST /login', () => {
  it('should return 200 if login is successful', async () => {
    // arrange

    // act
    const response = await app.handle(new Request(url('/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: user.password })
    }))
    const data = await response.json()

    // assert
    expect(response.status).toBe(200)
    expect(data.token).toBeTruthy()
  })

  it('should return 401 if user is not found', async () => {
    // arrange

    // act
    const response = await app.handle(new Request(url('/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'anymail@mail.com', password: 'anypassword' })
    }))

    // assert
    expect(response.status).toBe(401)
  })

  it('should return 401 if password is incorrect', async () => {
    // arrange

    // act
    const response = await app.handle(
      new Request(url('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@email.com', password: 'wrong_password' })
      })
    )

    // assert
    expect(response.status).toBe(401)
  })
})
