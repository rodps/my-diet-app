import { faker } from '@faker-js/faker'
import { createUserService } from './create-user.service'
import { describe, expect, it, mock, spyOn } from 'bun:test'
import { ConflictError } from '../../../errors/conflict.error'
import { type User } from '@prisma/client'

await mock.module('../repository', () => ({
  findByEmail: mock(() => {}),
  saveUser: mock(() => {})
}))

await mock.module('../../../libs/hash-password', () => ({
  hashPassword: mock(() => {})
}))

const repository = await import('../repository')
const hashPassword = await import('../../../libs/hash-password')

describe('createUser', () => {
  it('should throw ConflictError if user already exists', async () => {
    // arrange
    const data: User = {
      id: faker.number.int(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    spyOn(repository, 'findByEmail').mockResolvedValueOnce(data)

    // act
    const promise = createUserService(data)

    // assert
    expect(promise).rejects.toThrow(new ConflictError('User already exists'))
  })

  it('should save user with hashed password', async () => {
    // arrange
    const data: User = {
      id: faker.number.int(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    spyOn(repository, 'findByEmail').mockResolvedValueOnce(null)
    spyOn(hashPassword, 'hashPassword').mockResolvedValueOnce('hashed_password')

    // act
    await createUserService(data)

    // assert
    expect(hashPassword.hashPassword).toHaveBeenCalledWith(data.password)
    expect(repository.saveUser).toHaveBeenCalledWith({
      ...data,
      password: 'hashed_password'
    })
  })
})
