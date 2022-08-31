import React, { useState } from 'react'
import NavigationButton from 'components/fragments/navigationButton/navigationButton'
import { getTokenList } from 'components/home/ressource'
import style from './style.module.scss'
import { useQuery } from 'react-query'

const Swap: React.FC = () => {
  const { data: tokens, isLoading } = useQuery<Token[]>(
    'getTokenList',
    getTokenList
  )

  const [firstToken, setFirstToken] = useState<Token | null>(null)
  const [firstTokenAmount, setFirstTokenAmount] = useState<string>('0')
  const [secondSymbol, setSecondSymbol] = useState(null)

  // @TODO: had a loader component
  if (isLoading) {
    return <p className={style.loader}>...</p>
  }

  // @TODO: had an error handler component
  if (tokens === undefined) {
    return <p>Error while loading data</p>
  }

  const handleTokenChange = (value: string): void => {
    setFirstToken(tokens?.find(token => token.display === value) ?? null)
  }

  console.log(firstToken, firstTokenAmount)

  return (
    <div className={style.home}>
      <NavigationButton to="/" label="Back to home" />
      <div>
        <p>From</p>
        <select
          placeholder='from'
          value={firstToken?.display}
          onChange={e => handleTokenChange(e.target.value)}
        >
          <option value="">Please chose a token</option>
          {tokens?.map(token => (
            <option key={token.display} value={token.display}>
              {token.symbol}
            </option>
          ))}
        </select>
        <input
          value={firstTokenAmount}
          type='number'
          onChange={e => setFirstTokenAmount(e.target.value)}
        />
        {firstToken && firstTokenAmount && <p>{firstToken.price * parseInt(firstTokenAmount, 10)}</p>}
      </div>

      <div>
        <p>To</p>
        <select
          placeholder='to'
          value={firstToken?.display}
          onChange={e => handleTokenChange(e.target.value)}
        >
          <option value="">Please chose a token</option>
          {tokens?.map(token => (
            <option key={token.display} value={token.display}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

Swap.displayName = 'Swap'

export default Swap
