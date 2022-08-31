import {
  ColumnDef
} from '@tanstack/react-table'

const getColumns = (): Array<ColumnDef<Token, any>> => {
  return [
    {
      header: 'Token',
      accessorFn: (token: Token) => `${token.name} (${token.symbol})`
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

const getCellType = (colId: string): CellType => {
  if (['Price', 'Liquidity', 'Volume 24h'].includes(colId)) {
    return 'price'
  }

  if (['Volume 24h change', 'Price 24h change'].includes(colId)) {
    return 'percent'
  }

  return 'string'
}

export {
  getColumns,
  getCellType
}
