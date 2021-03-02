import { Router } from 'express'
const router = Router()
import meRoute from './me/me.route'
import auth from '../../middlewares/auth'

router.use('/me', auth.required, meRoute)

export default router
