import { Router } from 'express'
const router = Router()
import coinsRoute from './coins/coins.route'

router.use('/coins', coinsRoute)

export default router
