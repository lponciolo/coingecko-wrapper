import axios from 'axios'

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
}

export default CoinGeckoWrapper
