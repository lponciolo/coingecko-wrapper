import { User } from '../../../../db/models/User'
import { Coin, CoinDocument } from '../../../../db/models/Coin'
import CoinGeckoWrapper from '../../../utils/coinGeckoWrapper'

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export default async (body: any, authUser: any) => {
  const geckoresponse: any = await CoinGeckoWrapper.getCoinInfo(body.name)
  const coinId = capitalize(body.name)
  const coinObj: any = {
    userid: authUser.id,
    symbol: geckoresponse.symbol,
    name: geckoresponse.name,
    priceAtSave: {
      ars: geckoresponse.market_data.current_price.ars,
      usd: geckoresponse.market_data.current_price.usd,
      eur: geckoresponse.market_data.current_price.eur,
    },
    lastUpdated: geckoresponse.last_updated,
    image: geckoresponse.image.small,
  }
  const oldCoin = await Coin.findOne({
    userid: authUser.id,
    name: coinId,
  })
  const user = await User.findById(authUser.id)
  let newCoin: CoinDocument

  const userCoinsArray: Array<string> = (user?.coins as unknown) as Array<string>
  if (userCoinsArray.length > 24)
    throw new Error('you must delete 1 coin first')

  if (oldCoin) {
    oldCoin.overwrite(coinObj)
    oldCoin.save()
    newCoin = oldCoin
  } else {
    newCoin = await Coin.create(coinObj)
    if (user) {
      user.coins.push(newCoin._id)
      user.save()
    } else {
      throw new Error('user not found')
    }
  }
  return await newCoin
}
