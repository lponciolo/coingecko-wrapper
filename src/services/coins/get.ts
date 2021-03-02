import coinWrapper from '../utils/coinGeckoWrapper'

export default async (reqBody: any) => {
  const vsCurrency = reqBody.vsCurrency
  const perPage = reqBody.perPage
  const page = reqBody.page
  const geckoResult: Object[] = await coinWrapper.getCoinsList(
    vsCurrency,
    perPage,
    page
  )
  const finalArray: Object[] = []
  geckoResult.map((data: any) => {
    finalArray.push({
      id: data.id,
      symbol: data.symbol,
      currentPrice: data.current_price,
      name: data.name,
      image: data.image,
      lastUpdated: data.last_updated,
    })
  })
  return finalArray
}
