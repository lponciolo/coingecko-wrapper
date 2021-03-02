/* eslint-disable require-jsdoc */
import jwt from 'express-jwt'
import { Request } from 'express'

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

const auth = {
  required: jwt({
    secret: process.env.TOKEN_SECRET as string,
    algorithms: ['HS256'],
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: process.env.TOKEN_SECRET as string,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
}
export default auth
