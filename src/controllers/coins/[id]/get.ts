import { Request, Response, NextFunction } from 'express'
import coinInfoGetService from '../../../services/coins/[id]/get'

import createError from 'http-errors'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params)
    const serviceMessage = await coinInfoGetService(req.params)
    return res.status(200).json(serviceMessage)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
