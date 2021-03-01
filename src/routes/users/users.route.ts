import { Router } from 'express'
import passport from 'passport'
import signupController from '../../controllers/users/signup'
import loginController from '../../controllers/users/login'
import refreshTokenController from '../../controllers/users/token'
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

router.post('/token', refreshTokenController)
export default router
