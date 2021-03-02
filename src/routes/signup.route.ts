import { Router } from 'express'
import passport from 'passport'
import signupController from '../controllers/users/me/coins/post.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  signupController
)

export default router
