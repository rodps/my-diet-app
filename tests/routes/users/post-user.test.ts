import { beforeEach, describe, expect, it } from 'bun:test'
import { app } from '../../../src'
import prisma from '../../../src/db'
import { url } from '../../utils'

describe('POST /users', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  it('should return 201 if user is created', async () => {
    // arrange
    const body = {
      name: 'John Doe',
      email: 'n3x3l@example.com',
      password: 'password'
    }

    // act
    const response = await app.handle(new Request(url('/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }))
    const user = await prisma.user.findFirst({ where: { email: body.email } })

    // assert
    expect(response.status).toBe(201)
    expect(user).toBeTruthy()
    expect(user?.email).toBe(body.email)
    expect(user?.name).toBe(body.name)
    expect(user?.password).not.toBe(body.password)
  })

  it('should return 409 if user already exists', async () => {
    // arrange
    const user = {
      name: 'John Doe',
      email: 'n3x3l@example.com',
      password: 'password'
    }
    await prisma.user.create({ data: user })

    // act
    const response = await app.handle(new Request(url('/users'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }))
    const data = await response.json()

    // assert
    expect(response.status).toBe(409)
    expect(data.message).toBe('User already exists')
  })
})
