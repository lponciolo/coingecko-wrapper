import { User } from '../../../../db/models/User'

export default async (authUser: any) => {
  const user = await User.findById(authUser.id).populate('coins')
  if (user) {
  } else {
    throw new Error('user not found')
  }
  return await user.coins
}
