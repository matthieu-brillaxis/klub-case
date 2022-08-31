import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'

export type OptionValue = string | number

export interface Option<T extends OptionValue> {
  value: T
  label: string
}

interface Props<T extends OptionValue> {
  value: T
  options: Array<Option<T>>
  onChange: (value: T | null) => void
  className?: string
}

function Select<T extends OptionValue> ({
  options,
  value,
  onChange,
  className
}: Props<T>): JSX.Element {
  return (
    <select
      className={classnames(style.select, className)}
      value={value}
      onChange={e => {
        const selectedOption = options.find(option => option.value === e.currentTarget.value)
        onChange(selectedOption?.value ?? null)
      }}
    >
      <option value="">Please chose an option</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

Select.displayName = 'Select'

export default Select
