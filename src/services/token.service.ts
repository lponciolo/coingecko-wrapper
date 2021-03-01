import { RefreshToken } from '../db/models/RefreshToken'
import { User } from '../db/models/User'
import { createNewRefreshToken } from '../loaders/passport'

export default async (refreshTokenString: string, usernameString: string) => {
  let finalPayload = {}
  if (!refreshTokenString) throw new Error('wrong request')
  if (!usernameString) throw new Error('wrong request')
  const result = await RefreshToken.find({
    refreshToken: refreshTokenString,
  })
  if (result.length > 0) {
    console.log('mayor a 0')
    await Promise.all(
      result.map(async (singleResponse) => {
        const user = await User.findOne({ _id: singleResponse.userid })
        if (
          user &&
          user.username === usernameString &&
          singleResponse.isActive
        ) {
          const newRefreshToken = await createNewRefreshToken(user._id)
          const signedJWT = await user.generateJWT()

          if (newRefreshToken) {
            finalPayload = {
              message: 'token successful',
              accessToken: signedJWT,
              newRefreshToken: newRefreshToken.refreshToken,
            }
          } else {
            throw new Error('server error')
          }
        } else {
          throw new Error('invalid token')
        }
      })
    )
    console.log(finalPayload)
    return finalPayload
  } else {
    console.log('token not found')
    throw new Error('token not found')
  }
}
