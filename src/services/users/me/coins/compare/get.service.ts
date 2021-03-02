import { User } from '../../../../../db/models/User'
import CoinGeckoWrapper from '../../../../utils/coinGeckoWrapper'

export default async (authUser: any) => {
  console.log(authUser)
  let coinArray: Array<any> = []
  const user = await User.findById(authUser.id).populate('coins')
  if (user) {
    const allUserCoins = user.coins as Array<any>
    allUserCoins.map((coin) => {
      coinArray.push(coin.name)
    })

    const geckoResultList: any = await CoinGeckoWrapper.getCoinsPrices(
      coinArray,
      user.preferredCurrency
    )
    console.log(geckoResultList)
    coinArray = []
    allUserCoins.map((coin) => {
      const coinName = coin.name.toLowerCase()
      const actualPrice =
        geckoResultList[`${coinName}`][`${user.preferredCurrency}`]
      const lastUpdate = new Date(
        geckoResultList[`${coinName}`][`last_updated_at`] * 1000
      )
      console.log(actualPrice)
      const newObj = {
        symbol: coin.symbol,
        priceAtSave: coin.priceAtSave[user.preferredCurrency],
        name: coinName,
        image: coin.image,
        created: coin.created,
        lastUpdated: lastUpdate,
        actualPrice: actualPrice,
        preferredCurrency: user.preferredCurrency,
      }
      coinArray.push(newObj)
    })
  } else {
    throw new Error('user not found')
  }
  return coinArray
}
