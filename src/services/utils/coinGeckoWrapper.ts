import axios from 'axios'
import querystring from 'querystring'
const conGeckoInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  timeout: 1000,
  headers: { accept: 'application/json' },
})

const CoinGeckoWrapper = {
  getCoinsList: async (vsCurrency: string, perPage: string, page: number) => {
    const payload = {
      params: {
        vs_currency: vsCurrency,
        order: 'market_cap_desc',
        per_page: perPage,
        sparkline: 'false',
        page: page,
      },
    }
    const response = await conGeckoInstance.get('/coins/markets', payload)
    const data: Object[] = response.data
    return data
  },

  getCoinInfo: async (id: string) => {
    const payload = {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: true,
        sparkline: false,
      },
    }
    const response = await conGeckoInstance.get(`/coins/${id}`, payload)
    const data: Object[] = response.data
    return data
  },

  getCoinsPrices: async (
    coinsIdArray: Array<String>,
    preferredCurrency: string
  ) => {
    let idString: string = coinsIdArray[0] as string
    coinsIdArray = coinsIdArray.slice(1, coinsIdArray.length)
    coinsIdArray.map((id) => {
      idString = `${idString},${id}`
    })

    const query = querystring.stringify({
      ids: idString,
      vs_currencies: preferredCurrency,
    })

    const response = await conGeckoInstance.get(
      `/simple/price?${query}&include_last_updated_at=true`
    )
    console.log(response.data)
    return response.data
  },
}

export default CoinGeckoWrapper
