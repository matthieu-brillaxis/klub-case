import { formatPrice, isNegativeNumber, isNumber, isPositiveNumber, roundNumber } from 'helpers/numbers'
import React from 'react'
import classNames from 'classnames'
import style from './style.module.scss'

interface Props {
  className?: string
  content: string | number
  type: CellType
}

const TableCell: React.FC<Props> = ({ className, content, type }) => {
  const getValue = (): string | number => {
    if (type === 'price' && isNumber(content)) {
      return formatPrice(content)
    }

    if (type === 'percent' && isNumber(content)) {
      return `${roundNumber(content)} %`
    }

    return content as string
  }

  return (
    <td className={classNames(style.content, className, {
      [style.positiveValue]: type === 'percent' && isPositiveNumber(content),
      [style.negativeValue]: type === 'percent' && isNegativeNumber(content)
    })}>
      <span>{getValue()}</span>
    </td>
  )
}

TableCell.displayName = 'TableCell'

export default TableCell
