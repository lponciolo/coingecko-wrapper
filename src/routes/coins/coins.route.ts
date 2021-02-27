import { Router } from 'express'
import coinsGet from '../../controllers/coins/get'
import coinInfoGet from '../../controllers/coins/[id]/get'

const router = Router()

router.get('/', coinsGet)
router.get('/:id', coinInfoGet)

export default router
