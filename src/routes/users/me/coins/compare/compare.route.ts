import { Router } from 'express'
const router = Router()
import getCoinsComparsionController from '../../../../../controllers/users/me/coins/compare/get.controller'
import getCompareValidationSchema from '../../../../../validators/users/me/coins/compare/getcompare.validation'
router.get('/', getCompareValidationSchema, getCoinsComparsionController)

export default router
