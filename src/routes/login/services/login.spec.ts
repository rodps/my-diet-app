import { beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { loginService } from './login.service'
import { UnauthorizedError } from '../../../errors'

await mock.module('../../users/repository', () => ({
  findByEmail: mock(() => {})
}))

await mock.module('../../../libs/hash-password', () => ({
  comparePasswords: mock(() => {})
}))

await mock.module('../../../libs/jwt', () => ({
  signJWT: mock(() => {
    return 'token'
  })
}))

const repository = await import('../../users/repository')
const hashPassword = await import('../../../libs/hash-password')
const jwt = await import('../../../libs/jwt')

const findByEmailSpy = spyOn(repository, 'findByEmail')
const comparePasswordsSpy = spyOn(hashPassword, 'comparePasswords')

describe('login', () => {
  beforeEach(() => {
    findByEmailSpy.mockReset()
    comparePasswordsSpy.mockReset()
  })

  it('should throw UnauthorizedError if user not found', async () => {
    // arrange
    const email = 'n3x3l@example.com'
    const password = 'password'

    findByEmailSpy.mockResolvedValueOnce(null)

    // act
    const promise = loginService(email, password)

    // assert
    expect(promise).rejects.toThrow(new UnauthorizedError('Invalid email or password'))
  })

  it('should throw UnauthorizedError if password is incorrect', async () => {
    // arrange
    const email = 'n3x3l@example.com'
    const password = 'password'

    const user = {
      id: 1,
      name: 'John Doe',
      email: 'n3x3l@example.com',
      password: 'hashed_password'
    }

    findByEmailSpy.mockResolvedValueOnce(user)
    comparePasswordsSpy.mockResolvedValueOnce(false)

    // act
    const promise = loginService(email, password)

    // assert
    expect(promise).rejects.toThrow(new UnauthorizedError('Invalid email or password'))
  })

  it('should return token if user and password are correct', async () => {
    // arrange
    const email = 'n3x3l@example.com'
    const password = 'password'

    const user = {
      id: 1,
      name: 'John Doe',
      email: 'n3x3l@example.com',
      password: 'hashed_password'
    }

    findByEmailSpy.mockResolvedValueOnce(user)
    comparePasswordsSpy.mockResolvedValueOnce(true)

    // act
    const token = await loginService(email, password)

    // assert
    expect(token).toBe('token')
    expect(hashPassword.comparePasswords).toHaveBeenCalledWith(password, user.password)
    expect(repository.findByEmail).toHaveBeenCalledWith(email)
    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(hashPassword.comparePasswords).toHaveBeenCalledTimes(1)
    expect(jwt.signJWT).toHaveBeenCalledTimes(1)
  })
})
