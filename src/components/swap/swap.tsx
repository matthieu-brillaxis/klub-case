import React, { useState } from 'react'
import { formatPrice, roundNumber } from 'helpers/numbers'
import Input from 'components/fragments/input/input'
import NavigationButton from 'components/fragments/navigationButton/navigationButton'
import Select from 'components/fragments/select/select'
import { getOptionsFromObject } from 'components/fragments/select/select.utils'
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
  const [secondToken, setSecondToken] = useState<Token | null>(null)

  // @TODO: had a loader component
  if (isLoading) {
    return <p className={style.loader}>...</p>
  }

  // @TODO: had an error handler component
  if (tokens === undefined) {
    return <p>Error while loading data</p>
  }

  const handleFirstTokenChange = (value: string | null): void => {
    setFirstToken(tokens?.find(token => token.display === value) ?? null)
  }

  const handleSecondTokenChange = (value: string | null): void => {
    setSecondToken(tokens?.find(token => token.display === value) ?? null)
  }

  const options = getOptionsFromObject({ options: tokens, labelKey: 'symbol', valueKey: 'display' })

  return (
    <div className={style.swap}>
      <div className={style.card}>
        <NavigationButton to="/" label="Back to home" />
        <h1 className={style.cardTitle}>Swap</h1>
        <div>
          <p>From</p>
          <Select
            className={style.firstSelect}
            value={firstToken?.display ?? ''}
            options={options}
            onChange={value => handleFirstTokenChange(value)}
          />
          <Input
            value={firstTokenAmount}
            type='number'
            onChange={e => setFirstTokenAmount(e.target.value)}
          />
          {firstToken && firstTokenAmount && <span className={style.value}>= {formatPrice(firstToken.price * parseInt(firstTokenAmount, 10))}</span>}
        </div>
        <div>
          <p>To</p>
          <Select
            value={secondToken?.display ?? ''}
            options={options}
            onChange={value => handleSecondTokenChange(value)}
          />
          {firstToken && secondToken && firstTokenAmount && <span className={style.value}>= {roundNumber(firstToken.price * parseInt(firstTokenAmount, 10) / secondToken.price)} {secondToken.display}</span>}
        </div>
      </div>
    </div>
  )
}

Swap.displayName = 'Swap'

export default Swap
