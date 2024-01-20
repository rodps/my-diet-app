import prisma from '../src/db'
import { loginService } from '../src/routes/login/services/login.service'
import { createUserService } from '../src/routes/users/services/create-user.service'
import { findByEmail } from '../src/routes/users/repository'
import { type User } from '@prisma/client'

const url = (route: string): string => `${process.env.API_URL}${route}`

const testUser = {
  name: 'test',
  email: 'test@me.com',
  password: 'test'
}

const createTestUser = async (): Promise<User> => {
  let user = await findByEmail(testUser.email)
  if (user == null) {
    user = await createUserService(testUser)
  }
  user.password = testUser.password
  return user
}

const getTestUserToken = async (): Promise<string> => {
  const user = await createTestUser()
  const token = await loginService(user.email, user.password)
  return token
}

const deleteTestData = async (): Promise<void> => {
  if (Bun.env.NODE_ENV !== 'test') throw new Error('Not in test environment')

  await prisma.user.deleteMany({ where: { email: { not: testUser.email } } })
  await prisma.food.deleteMany()
  await prisma.meal.deleteMany()
  await prisma.composition.deleteMany()
}

export {
  url,
  createTestUser,
  getTestUserToken,
  deleteTestData
}
