import coinWrapper from '../../utils/coinGeckoWrapper'

export default async (reqParams: any) => {
  const id = reqParams.id
  console.log(id)
  const geckoResult: any = await coinWrapper.getCoinInfo(id)
  const response = {
    id: geckoResult.id,
    symbol: geckoResult.symbol,
    name: geckoResult.name,
    current_price: {
      ars: geckoResult.market_data.current_price.ars,
      usd: geckoResult.market_data.current_price.usd,
      eur: geckoResult.market_data.current_price.eur,
    },
    last_updated: geckoResult.last_updated,
    image: geckoResult.image.small,
  }

  return response
}
