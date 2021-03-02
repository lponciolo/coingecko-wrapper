import { Router } from 'express'
import passport from 'passport'
import loginController from '../controllers/login.controller'
import loginValidationSchemaSchema from '../validators/login.validation'
const router = Router()

router.post(
  '/',
  loginValidationSchemaSchema,
  passport.authenticate('login', { session: false }),
  loginController
)
export default router
