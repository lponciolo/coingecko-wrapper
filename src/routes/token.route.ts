import { Router } from 'express'
import tokenController from '../controllers/token.controller'

const router = Router()
router.post('/', tokenController)

export default router
