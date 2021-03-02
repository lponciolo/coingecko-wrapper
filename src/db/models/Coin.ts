/* eslint-disable no-invalid-this */
import mongoose, { Document, Schema } from 'mongoose'

export interface iCoin extends Document {
  symbol: String
  priceAtSave: {
    ars: number
    usd: number
    eur: number
  }
  name: String
  image: String
  created: Date
  lastUpdated: Date
}
export interface CoinDocument extends iCoin, Document {}
export const CoinSchema: Schema<iCoin> = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    symbol: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      index: true,
    },
    name: { type: String, required: [true, "can't be blank"] },
    image: { type: String, required: [true, "can't be blank"] },
    priceAtSave: {
      ars: Number,
      usd: Number,
      eur: Number,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: Date,
  },
  { timestamps: true }
)

const Coin = mongoose.model<CoinDocument>('Coin', CoinSchema)

export { Coin }
