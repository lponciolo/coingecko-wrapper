import { Router } from 'express'

const router = Router()

// import controllers
import WelcomeRoute from './welcome.route'
import loginRoute from './login.route'
import adminRoute from './admin.route'
import coinsRoute from './coins/coins.route'
import tokenRoute from './token.route'
import signupRoute from './signup.route'
import usersRoute from './users/users.route'
//

// import more routes here

router.use('/', WelcomeRoute)
router.use('/coins', coinsRoute)
router.use('/login', loginRoute)
router.use('/signup', signupRoute)
router.use('/admin', adminRoute)
router.use('/users', usersRoute)
router.use('/token', tokenRoute)

export default router
