import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import validateRequest from './index'

const Schema = Joi.object({
  refreshToken: Joi.string().alphanum().min(256).max(256).required().empty(),
  username: Joi.string().alphanum().min(8).required().empty(),
})

const loginValidationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validateRequest(req, next, Schema)
}

export default loginValidationSchema
