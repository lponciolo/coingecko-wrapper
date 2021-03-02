import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import validateRequest from './../index'

const Schema = Joi.object({
  vsCurrency: Joi.any().valid('ars', 'usd', 'eur').required().empty(),
  perPage: Joi.number().min(1).max(250).required().empty(),
  page: Joi.number().min(1).required().empty(),
})

const loginValidationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validateRequest(req, next, Schema)
}

export default loginValidationSchema
