import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import prisma from '../../../src/db'
import { url } from '../../utils'
import { app } from '../../../src'

describe('POST /login', () => {
  beforeAll(async () => {
    const hash = await Bun.password.hash('123456', { algorithm: 'bcrypt' })
    const user = {
      email: 'test@email.com',
      name: 'testerson',
      password: hash
    }
    await prisma.user.create({ data: user })
  })

  afterAll(async () => {
    await prisma.user.deleteMany({})
  })

  it('should return 200 if login is successful', async () => {
    // arrange

    // act
    const response = await app.handle(new Request(url('/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@email.com', password: '123456' })
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
