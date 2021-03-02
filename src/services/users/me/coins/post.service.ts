import { User } from '../../../../db/models/User'
import { Coin, CoinDocument } from '../../../../db/models/Coin'
import CoinGeckoWrapper from '../../../utils/coinGeckoWrapper'
export default async (body: any, authUser: any) => {
  const geckoresponse: any = await CoinGeckoWrapper.getCoinInfo(body.name)
  console.log(geckoresponse)
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
    name: body.name,
  })
  let newCoin: CoinDocument
  if (oldCoin) {
    await oldCoin.overwrite(coinObj)
    oldCoin.save()
    console.log(oldCoin)
    newCoin = oldCoin
  } else {
    newCoin = await Coin.create(coinObj)
  }
  const user = await User.findById(authUser.id)
  if (user) {
    user.coins.push(newCoin._id)
    user.save()
  } else {
    throw new Error('user not found')
  }
  return await newCoin
}
