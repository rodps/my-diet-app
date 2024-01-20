import { type User } from '@prisma/client'
import prisma from '../../db'
import { type ICreateUserData } from './services/create-user.service'

const saveUser = async (data: ICreateUserData): Promise<User> => {
  return await prisma.user.create({ data })
}

const findByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { email } })
}

export {
  saveUser,
  findByEmail
}
