import { Router } from 'express'
import tokenController from '../controllers/token.controller'
import tokenSchemaValidation from '../validators/token.validation'
const router = Router()
router.post('/', tokenSchemaValidation, tokenController)

export default router
