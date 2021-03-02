import { Request, Response, NextFunction } from 'express'
import coinInfoGetService from '../../../services/coins/[id]/get'

import createError from 'http-errors'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceMessage = await coinInfoGetService(req.params)
    return res.status(200).json(serviceMessage)
  } catch (e) {
    if (e.message === 'Request failed with status code 404')
      return next(createError(404, e.message))
    return next(createError(500, e.message))
  }
}
