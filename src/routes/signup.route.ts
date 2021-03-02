import { Router } from 'express'
import passport from 'passport'
import signupController from '../controllers/signup.controller'
import signuUpValidationSchema from '../validators/signup.validation'
const router = Router()

router.post(
  '/',
  signuUpValidationSchema,
  passport.authenticate('signup', { session: false }),
  signupController
)

export default router
