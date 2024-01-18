import { ConflictError } from '../../../errors/conflict.error'
import { hashPassword } from '../../../libs/hash-password'
import { findByEmail, saveUser } from '../repository'

interface ICreateUserData {
  name: string
  email: string
  password: string
}

const createUserService = async (data: ICreateUserData): Promise<void> => {
  const userExists = await findByEmail(data.email)

  if (userExists != null) {
    throw new ConflictError('User already exists')
  }

  const hashedPassword = await hashPassword(data.password)

  await saveUser({ ...data, password: hashedPassword })
}

export { createUserService, type ICreateUserData }
