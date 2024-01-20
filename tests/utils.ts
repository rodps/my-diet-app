import prisma from '../src/db'
import { loginService } from '../src/routes/login/services/login.service'
import { createUserService } from '../src/routes/users/services/create-user.service'

const url = (route: string): string => `${process.env.API_URL}${route}`

const createTestUser = async (): Promise<string> => {
  const user = {
    name: 'test',
    email: 'test@me.com',
    password: 'test'
  }
  await createUserService(user)
  const token = await loginService(user.email, user.password)
  return token
}

const deleteTestUser = async (): Promise<void> => {
  await prisma.user.deleteMany({ where: { email: 'test@me.com' } })
}

export { url, createTestUser, deleteTestUser }
