/* eslint-disable no-invalid-this */
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'

import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
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
UserSchema.methods.setPassword = function(password){
      (<any>this).salt = crypto.randomBytes(16).toString('hex');
      (<any>this).hash = crypto.pbkdf2Sync(password, (<any>this).salt, 10000, 512, 'sha512').toString('hex');
    }


UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, (<any>this).salt, 10000, 512, 'sha512')
    .toString('hex')
  return (<any>this).hash === hash
}

UserSchema.methods.generateJWT = function() {
    const secret = process.env.TOKEN_SECRET
    var today = new Date();
    var exp = new Date(today);
    var paseExp = (exp.getTime() / 1000)
      exp.setDate(today.getDate() + 60);
    
      return jwt.sign({
        id: this._id,
        username: (<any>this).username,
        exp: paseExp,
      }, secret as string);
    };

UserSchema.methods.toAuthJSON = function(){
          return {
            username: (<any>this).username,
            email: (<any>this).email,
            token: (<any>this).generateJWT(),
          };
        };
    
export default mongoose.model('User', UserSchema);
