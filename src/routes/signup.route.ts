import { Router } from 'express'
import passport from 'passport'
import signupController from '../controllers/signup.controller'

const router = Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  signupController
)

export default router
