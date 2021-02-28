import './loadEnv'
import { Application } from 'express'
import expressLoader from './express'
import Logger from './logger'
import mongooseInit from './mongoose'
import './passport'
export default async (expressApp: Application) => {
  Logger.info('inicializando')
  Logger.info('dot-env loaded')
  Logger.info('connectiong mongoDB')
  try {
    mongooseInit()
    Logger.info('success mongo connection')
  } catch (error) {
    Logger.error('error in mongo connection')
  }
  await expressLoader({ app: expressApp })
}
