/* eslint-disable no-invalid-this */
import mongoose, { Schema, Document } from 'mongoose'
interface iRefreshToken extends Document {
  refreshToken: String
  userid: any
  expires: Date
  created: Date
  revoked?: boolean
}

export interface RefreshTokenDocument extends iRefreshToken, Document {
  isExpired: { get(): boolean }
  isActive: { get(): boolean }
}

const RefreshTokenSchema: Schema<iRefreshToken> = new Schema({
  refreshToken: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  expires: Date,
  created: { type: Date, default: Date.now },
  revoked: Boolean,
})

RefreshTokenSchema.virtual('isExpired').get(function (
  this: RefreshTokenDocument
) {
  return Date.now() >= this.expires.getTime()
})

RefreshTokenSchema.virtual('isActive').get(function (
  this: RefreshTokenDocument
) {
  return !this.revoked && !this.isExpired
})

RefreshTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    // remove these props when object is serialized
    delete ret._id
  },
})

const RefreshToken = mongoose.model<RefreshTokenDocument>(
  'RefreshToken',
  RefreshTokenSchema
)
export { RefreshToken }
