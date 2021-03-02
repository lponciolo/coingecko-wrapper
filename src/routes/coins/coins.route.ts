import { Router } from 'express'
import coinsGet from '../../controllers/coins/get'
import coinsValidationSchema from '../../validators/coins/coins.validation'
import getCoinInfoRoute from './[id]/get.route'
const router = Router()
router.get('/', coinsValidationSchema, coinsGet)
router.use('/', getCoinInfoRoute)

export default router
