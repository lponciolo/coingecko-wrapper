import { Request, Response, NextFunction } from 'express'
import getCoinService from '../../../../services/users/me/coins/get.service'

import createError from 'http-errors'

const getCoinController = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceMessage = await getCoinService(req.user)
    return res.status(200).json({ status: 200, message: serviceMessage })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export default getCoinController
