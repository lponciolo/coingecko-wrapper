import { Router } from 'express'
const router = Router()
import getCoinsComparsionController from '../../../../../controllers/users/me/coins/compare/get.controller'

router.get('/', getCoinsComparsionController)

export default router
