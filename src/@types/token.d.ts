declare interface Token {
  denom: string
  display: string
  exponent: number
  liquidity: number
  main: boolean
  name: string
  price: number
  price_7d_change: number
  price_24h_change: number
  symbol: string
  volume_24h: number
  volume_24h_change: number
}

declare type CellType = 'price' | 'string' | 'percent'
