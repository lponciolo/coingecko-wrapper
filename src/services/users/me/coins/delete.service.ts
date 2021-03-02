import { User } from '../../../../db/models/User'
import { Coin } from '../../../../db/models/Coin'

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export default async (body: any, authUser: any) => {
  const coinId = capitalize(body.name)
  const oldCoin = await Coin.findOne({
    userid: authUser.id,
    name: coinId,
  })
  const user = await User.findById(authUser.id)
  let message: string = ''
  if (oldCoin) {
    console.log(true)
  } else {
    console.log(false)
  }
  if (oldCoin && user) {
    user.coins.pull(oldCoin._id)
    user.save()
    await Coin.deleteOne({ _id: oldCoin._id })
      .then(() => {
        message = 'successful delete'
      })
      .catch((error) => {
        throw new Error(error)
      })
  } else {
    throw new Error('user or coin document not found')
  }
  return message
}
