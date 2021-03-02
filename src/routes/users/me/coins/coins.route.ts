import { Router } from 'express'
const router = Router()
import getCoinsController from '../../../../controllers/users/me/coins/get.controller'
import postCoinsController from '../../../../controllers/users/me/coins/post.controller'
import compareRouteController from './compare/compare.route'

router.post('/', postCoinsController)
router.get('/', getCoinsController)
router.use('/compare', compareRouteController)
export default router
