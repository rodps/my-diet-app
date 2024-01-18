import { UnauthorizedError } from '../../../errors/unauthorized.error'
import { comparePasswords } from '../../../libs/hash-password'
import { signJWT } from '../../../libs/jwt'
import { findByEmail } from '../../users/repository'

const loginService = async (email: string, password: string): Promise<string> => {
  const user = await findByEmail(email)
  if (user == null) {
    throw new UnauthorizedError('Invalid email or password')
  }
  const passwordMatch = await comparePasswords(password, user.password)
  if (!passwordMatch) {
    throw new UnauthorizedError('Invalid email or password')
  }
  const token = await signJWT({ id: user.id })
  return token
}

export { loginService }
