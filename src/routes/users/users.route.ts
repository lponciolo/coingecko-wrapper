import { Router } from 'express'
const router = Router()
import meRoute from './me/me.route'
import auth from '../../middlewares/auth'
import passport from 'passport'
import signupController from '../../controllers/users/post.controller'

router.use('/me', auth.required, meRoute)

router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  signupController
)
export default router
