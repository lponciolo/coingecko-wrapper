import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import tokenRenewService from '../services/token.service'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('holis servicio')
    const payload = req.body
    console.log(payload)
    const serviceObject = await tokenRenewService(
      payload.refreshToken,
      payload.username
    )
    console.log('chau servicio')
    console.log(serviceObject)
    res.status(200).send(serviceObject)
  } catch (err) {
    switch (err.message) {
      case 'wrong request':
        next(createError(400))
        break
      case 'invalid token':
        next(createError(401))
        break

      case 'refresh token expirated':
        next(createError(401))
        break

      case 'token not found':
        next(createError(401))
        break
      default:
        next(createError(500))
        break
    }
  }
}
