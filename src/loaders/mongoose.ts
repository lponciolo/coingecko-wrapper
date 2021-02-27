import mongoose from 'mongoose'
import Logger from './logger'
export default async () => {
  await mongoose.connect('mongodb://localhost:27017/gecko-wrapper', {
    useNewUrlParser: true,
  })

  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise
  // Get the default connection
  const db = mongoose.connection

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(Logger.error, 'MongoDB connection error:'))
}
