import { Router } from 'express'
const router = Router()
import getCoinsController from '../../../../controllers/users/me/coins/get.controller'
import postCoinsController from '../../../../controllers/users/me/coins/post.controller'
import deleteCoinsController from '../../../../controllers/users/me/coins/delete.controller'
import compareRouteController from './compare/compare.route'
import postCoinValidationSchema from '../../../../validators/users/me/coins/postMeCoins.validation'
import deleteValidationSchema from '../../../../validators/users/me/coins/postMeCoins.validation'
import getCoinValidationSchema from '../../../../validators/users/me/coins/getMeCoins.validation'

router.post('/', postCoinValidationSchema, postCoinsController)
router.get('/', getCoinValidationSchema, getCoinsController)
router.delete('/', deleteValidationSchema, deleteCoinsController)
router.use('/compare', compareRouteController)
export default router
