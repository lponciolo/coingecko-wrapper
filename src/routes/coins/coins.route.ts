import { Router } from 'express'
import coinsGet from '../../controllers/coins/get'
import coinInfoGet from '../../controllers/coins/[id]/get'
import coinsValidationSchema from '../../validators/coins/coins.validation'
import coinInfoValidationSchema from '../../validators/coins/[id]/coin.validation'
const router = Router()

router.get('/', coinsValidationSchema, coinsGet)
router.get('/:id', coinInfoValidationSchema, coinInfoGet)

export default router
