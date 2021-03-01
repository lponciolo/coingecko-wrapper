import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Signup successful',
    user: req.user.username,
    refreshToken: req.user.refreshToken,
  })
}
