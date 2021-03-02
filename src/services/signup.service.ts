import { User } from '../db/models/User'
export default async (body: any, username: any) => {
  const user = await User.findOne({ username: username })
  if (user) {
    user.preferredCurrency = body.preferredCurrency
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.save()
  }
  return true
}
