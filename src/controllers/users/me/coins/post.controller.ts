import { Request, Response, NextFunction } from 'express'
import postCoinService from '../../../../services/users/me/coins/post.service'
import createError from 'http-errors'

const postCoinController = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceMessage = await postCoinService(req.body, req.user)
    return res
      .status(200)
      .json({ status: 200, message: 'added new coin', coin: serviceMessage })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export default postCoinController
