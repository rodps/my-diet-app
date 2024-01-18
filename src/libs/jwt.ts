import jsonwebtoken from 'jsonwebtoken'
import env from '../config/env'

const signJWT = async (payload: any): Promise<string> => {
  return jsonwebtoken.sign({ foo: 'bar' }, env.jwtSecret, { expiresIn: '1d' })
}

const verifyJWT = async (token: string): Promise<any> => {
  return jsonwebtoken.verify(token, env.jwtSecret)
}

export { signJWT, verifyJWT }
