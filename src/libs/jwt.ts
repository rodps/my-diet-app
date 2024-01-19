import jsonwebtoken from 'jsonwebtoken'
import env from '../config/env'

interface IJwtPayload {
  id: number
}

const signJWT = async (payload: IJwtPayload): Promise<string> => {
  return jsonwebtoken.sign(payload, env.jwtSecret, { expiresIn: '1d' })
}

const verifyJWT = async (token: string): Promise<IJwtPayload> => {
  return jsonwebtoken.verify(token, env.jwtSecret) as IJwtPayload
}

export { signJWT, verifyJWT }
