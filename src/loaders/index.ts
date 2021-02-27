import { Application } from 'express'
import expressLoader from './express'
import Logger from './logger'
import * as dotenv from 'dotenv'
import path from 'path'
import mongooseInit from './mongoose'
export default async (expressApp: Application) => {
  Logger.info('inicializando')
  const result = dotenv.config({ path: path.join(__dirname, '../../.env') })
  if (result.error) {
    Logger.error('error loading dot-env')
    throw result.error
  } else {
    Logger.info('dot-env loaded')
  }
  Logger.info('connectiong mongoDB')
  try {
    mongooseInit()
    Logger.info('success mongo connection')
  } catch (error) {
    Logger.error('error in mongo connection')
  }
  await expressLoader({ app: expressApp })
}
