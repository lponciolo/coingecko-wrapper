import { Router } from 'express'

import coinInfoGet from '../../../controllers/coins/[id]/get'

import coinInfoValidationSchema from '../../../validators/coins/[id]/coin.validation'
const router = Router()

router.get('/:id', coinInfoValidationSchema, coinInfoGet)

export default router
