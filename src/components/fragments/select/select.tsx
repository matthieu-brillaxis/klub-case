import React from 'react'

type OptionValue = string | number

interface Option<T extends OptionValue> {
  value: T
  label: string
}

interface Props<T extends OptionValue> {
  options: Array<Option<T>>
  value: T
  onChange: (value: T) => void
}

function Select = ({
  options,
  value, 
  onChange
}: Props<T>) => {
  return (
    <select
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
  )
}

Select.displayName = 'Select'

export default Select
