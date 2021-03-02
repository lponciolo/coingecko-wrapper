import { Request, Response, NextFunction } from 'express'
import getCoinsComparsionService from '../../../../../services/users/me/coins/compare/get.service'

import createError from 'http-errors'

const getCoinController = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceMessage = await getCoinsComparsionService(
      req.user,
      req.body.sortAscendent
    )
    return res.status(200).json({ status: 200, coins: serviceMessage })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export default getCoinController
