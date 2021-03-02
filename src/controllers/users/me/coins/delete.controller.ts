import { Request, Response, NextFunction } from 'express'
import deleteCoinService from '../../../../services/users/me/coins/delete.service'
import createError from 'http-errors'

const deleteCoinController = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceMessage = await deleteCoinService(req.body, req.user)
    return res.status(200).json({ status: 200, message: serviceMessage })
  } catch (e) {
    if (e.message === 'Request failed with status code 404')
      return next(createError(404, e.message))
    if (e.message === 'user or coin document not found')
      return next(createError(404, e.message))
    return next(createError(500, e.message))
  }
}

export default deleteCoinController
