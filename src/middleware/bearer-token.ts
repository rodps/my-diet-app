/* eslint-disable no-template-curly-in-string */
import Elysia, { t } from 'elysia'
import { UnauthorizedError } from '../errors'
import { verifyJWT } from '../libs/jwt'

const bearerToken = new Elysia()
  .guard({
    headers: t.Object({
      authorization: t.TemplateLiteral('Bearer ${string}')
    })
  })
  .resolve(async ({ headers: { authorization } }) => {
    return { bearer: authorization.split(' ')[1] }
  })
  .resolve(async ({ bearer }) => {
    try {
      const payload = await verifyJWT(bearer)
      return {
        user: payload
      }
    } catch (err) {
      throw new UnauthorizedError('Invalid token')
    }
  })

export { bearerToken }
