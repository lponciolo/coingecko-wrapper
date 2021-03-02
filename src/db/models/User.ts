/* eslint-disable no-invalid-this */
import mongoose, { Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export interface iUser extends Document {
  username?: string
  firstName: string
  lastName: string
  preferredCurrency: string
  hash?: string
  salt?: string
  validPassword?: Function
  methods?: any
  accessToken?: string
  refreshToken?: string
  coins?: any
}

interface AuthJson {
  username: string
  email: string
  token: string
}

export interface UserDocument extends iUser, Document {
  setPassword(password: string): void
  validPassword(password: string): boolean
  generateJWT(): string
  toAuthJSON(): AuthJson
  coins: { push(coinId: Schema.Types.ObjectId): any }
}

const UserSchema: Schema<iUser> = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    coins: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Coin' }],
    },
    firstName: String,
    lastName: String,
    preferredCurrency: String,
    hash: String,
    salt: String,
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })
UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.validPassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt!, 10000, 512, 'sha512')
    .toString('hex')
  return (<any>this).hash === hash
}

UserSchema.methods.generateJWT = function () {
  const secret = process.env.TOKEN_SECRET
  const today = new Date()
  const exp = new Date(today)
  const paseExp =
    exp.getTime() / 1000 +
    parseInt(process.env.TOKEN_EXPIRATION_TIME_SECONDS as string)
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      preferredCurrency: this.preferredCurrency,
      exp: paseExp,
    },
    secret as string
  )
}

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    token: (<any>this).generateJWT(),
  }
}

const User = mongoose.model<UserDocument>('User', UserSchema)

export { User }
