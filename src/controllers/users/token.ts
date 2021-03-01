import { Request, Response, NextFunction } from 'express'
import { RefreshToken } from '../../db/models/RefreshToken'
import { User } from '../../db/models/User'
import createError from 'http-errors'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    if (payload.refreshToken) {
      const result = await RefreshToken.find({
        refreshToken: payload.refreshToken,
      })
      console.log(result)
      result.map(async (singleResponse) => {
        const user = await User.findOne({ _id: singleResponse.userid })
        if (user) {
          if (!singleResponse.isActive)
            throw new Error('refresh token expirated')
          if (user.username === payload.username) {
            const signedJWT = user.generateJWT()
            res.json({
              accessToken: signedJWT,
            })
          } else {
            next(createError(403))
          }
        } else {
          next(createError(400))
        }
      })
    }
  } catch (err) {
    if (err === 'refresh token expirated') next(createError(400))
  }
}
