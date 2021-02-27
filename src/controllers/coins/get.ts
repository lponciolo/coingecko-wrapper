import { Request, Response, NextFunction } from 'express'
import coinsGetService from '../../services/coins/get'

import createError from 'http-errors'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceMessage = await coinsGetService(req.query)
    return res.status(200).json(serviceMessage)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
