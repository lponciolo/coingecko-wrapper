import mongoose from 'mongoose'
import Logger from './logger'
export default async () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME,
  } = process.env

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  const urlDev = 'mongodb://localhost:27017/gecko-wrapper'
  const finalUrl = process.env.NODE_ENV === 'production' ? url : urlDev
  console.log(finalUrl)
  await mongoose.connect(finalUrl, {
    useNewUrlParser: true,
  })

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise
  // Get the default connection
  const db = mongoose.connection

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(Logger.error, 'MongoDB connection error:'))
}
