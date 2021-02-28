import { Router } from 'express'

const router = Router()

// import controllers
import WelcomeRoute from './welcome.route'
import loginRoute from './login.route'
import adminRoute from './admin.route'
import coinsRoute from './coins/coins.route'
import userRoute from './users/users.route'
//

// import more routes here

router.use('/', WelcomeRoute)
router.use('/coins', coinsRoute)
router.use('/login', loginRoute)
router.use('/admin', adminRoute)
router.use('/users', userRoute)

export default router
