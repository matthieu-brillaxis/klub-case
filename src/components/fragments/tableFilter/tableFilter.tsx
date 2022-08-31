/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { Column, Table } from '@tanstack/react-table'
import DebouncedInput from 'components/fragments/input/debouncedInput/debouncedInput'
import React from 'react'
import { isNumber } from 'helpers/numbers'
import style from './style.module.scss'
interface Props {
  column: Column<any, unknown>
  table: Table<any>
}

const TableFilter: React.FC<Props> = ({
  column,
  table
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      isNumber(firstValue)
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return isNumber(firstValue)
    ? (
      <div className={style.inputNumberContainer}>
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder="Min"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder="Max"
        />
      </div>
      )
    : (
      <div className={style.inputListContainer}>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          className={style.inputText}
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={value => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          list={column.id + 'list'}
        />
      </div>
      )
}

TableFilter.displayName = 'TableFilter'

export default TableFilter
