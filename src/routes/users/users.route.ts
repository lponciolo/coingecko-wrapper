import { Router } from 'express'
import passport from 'passport'
import signupController from '../../controllers/users/signup'
import loginController from '../../controllers/users/login'
const router = Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  signupController
)

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  loginController
)
export default router
