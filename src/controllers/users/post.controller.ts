import { Request, Response, NextFunction } from 'express'
import signupService from '../../services/users/post.service'

export default async (req: Request, res: Response, next: NextFunction) => {
  signupService(req.body, req.user.username as string)
  res.json({
    message: 'Signup successful',
    user: req.user.username,
    refreshToken: req.user.refreshToken,
  })
}
