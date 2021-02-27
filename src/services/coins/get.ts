import coinWrapper from '../utils/coinGeckoWrapper'

export default async (reqQuery: any) => {
  const vsCurrency = reqQuery.vs_currency
  const perPage = reqQuery.per_page
  const page = reqQuery.page
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
