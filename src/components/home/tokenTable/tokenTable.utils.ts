import {
  ColumnDef
} from '@tanstack/react-table'

const getColumns = (): Array<ColumnDef<Token, any>> => {
  return [
    {
      id: 'logo',
      header: '',
      accessorFn: (token: Token) => `https://app.osmosis.zone/_next/image?url=%2Ftokens%2F${token.symbol.toLowerCase()}.svg&w=32&q=75`
    },
    {
      header: 'Token',
      accessorFn: (token: Token) => token.display
    },
    {
      header: 'Liquidity',
      accessorFn: (token: Token) => token.liquidity
    },
    {
      header: 'Price',
      accessorFn: (token: Token) => token.price
    },
    {
      header: 'Price 24h change',
      accessorFn: (token: Token) => token.price_24h_change
    },
    {
      header: 'Volume 24h',
      accessorFn: (token: Token) => token.volume_24h
    },
    {
      header: 'Volume 24h change',
      accessorFn: (token: Token) => token.volume_24h_change
    }
  ]
}

export {
  getColumns
}
