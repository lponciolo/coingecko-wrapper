import passport from 'passport'
import passportLocal from 'passport-local'
import { User } from '../db/models/User'
const localStrategy = passportLocal.Strategy

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, done: Function) => {
      console.log('entra')
      try {
        const user = await User.findOne({
          username: username,
        })
        console.log(user)
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            errors: { 'email or password': 'is invalid' },
          })
        }
        const signedJWT = user.generateJWT()
        const accessToken = signedJWT
        user.accessToken = accessToken
        return done(null, user)
      } catch (error) {
        console.log(error)
      }
    }
  )
)

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      console.log(username)
      console.log(password)
      console.log('holis denuevo')
      try {
        const auxUser = new User({ username: username })
        auxUser.setPassword(password)
        console.log()
        const user = await User.create(auxUser)
        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)
