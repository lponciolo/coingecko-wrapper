import { User } from '../../../../../db/models/User'
import CoinGeckoWrapper from '../../../../utils/coinGeckoWrapper'

const sortAscendent = (objArray: Array<any>) => {
  objArray.sort(function (a: any, b: any) {
    return a.actualPrice - b.actualPrice
  })
}

const sotDescendent = (objArray: Array<any>) => {
  objArray.sort(function (a: any, b: any) {
    return b.actualPrice - a.actualPrice
  })
}

export default async (authUser: any, sortOption: boolean) => {
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

    coinArray = []
    allUserCoins.map((coin) => {
      const coinName = coin.name.toLowerCase()
      const actualPrice =
        geckoResultList[`${coinName}`][`${user.preferredCurrency}`]
      const lastUpdate = new Date(
        geckoResultList[`${coinName}`][`last_updated_at`] * 1000
      )

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
  if (coinArray.length > 1 && !sortOption) {
    sortAscendent(coinArray)
  }

  if (coinArray.length > 1 && sortOption) {
    sotDescendent(coinArray)
  }
  return coinArray
}
