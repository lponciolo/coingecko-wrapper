import { Router } from 'express'
const router = Router()
import getCoinsController from '../../../../controllers/users/me/coins/get.controller'
import postCoinsController from '../../../../controllers/users/me/coins/post.controller'

router.post('/', postCoinsController)
router.get('/', getCoinsController)

export default router
