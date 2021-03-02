import { Router } from 'express'

const router = Router()

// import controllers
import WelcomeRoute from './welcome.route'
import loginRoute from './login.route'
import coinsRoute from './coins/coins.route'
import tokenRoute from './token.route'
import usersRoute from './users/users.route'
//

// import more routes here

router.use('/', WelcomeRoute)
router.use('/coins', coinsRoute)
router.use('/login', loginRoute)
router.use('/users', usersRoute)
router.use('/token', tokenRoute)

export default router
