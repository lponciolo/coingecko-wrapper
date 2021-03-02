import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import validateRequest from './index'

const Schema = Joi.object({
  username: Joi.string().alphanum().min(8).required().empty(),
  password: Joi.string().alphanum().min(8).required().empty(),
  lastName: Joi.string().required().empty(),
  firstName: Joi.string().required().empty(),
  preferredCurrency: Joi.string()
    .valid('ars', 'usd', 'eur')
    .required()
    .messages({
      'any.valid': `"preferredCurrency" must be ont of "ars" "usd" or "eur"`,
    }),
})

const loginValidationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validateRequest(req, next, Schema)
}

export default loginValidationSchema
