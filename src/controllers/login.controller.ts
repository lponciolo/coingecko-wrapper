import { Request, Response, NextFunction } from 'express'
export default async (req: Request, res: Response, next: NextFunction) => {
  return res.send({
    message: 'login successful',
    username: req.user.username,
    accessToken: req.user.accessToken,
    refreshToken: req.user.refreshToken,
  })
}
