import { Router } from 'express'
import passport from 'passport'
import loginController from '../controllers/login.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('login', { session: false }),
  loginController
)
export default router
