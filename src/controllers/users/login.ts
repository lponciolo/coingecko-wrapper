import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('me llamaron')
  return res.json({
    message: 'login successful',
    username: req.user.username,
    accessToken: req.user.accessToken,
  })
}
