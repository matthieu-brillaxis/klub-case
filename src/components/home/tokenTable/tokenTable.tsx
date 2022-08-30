import React, { useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState
} from '@tanstack/react-table'
import { getColumns } from './tokenTable.utils'
import TableFilter from 'components/fragments/tableFilter/tableFilter'
import TokenTableFooter from './tokenTableFooter/tokenTableFooter'
import Icon from 'components/fragments/icon/icon'

interface Props {
  tokens: Token[]
}

const TokenTable: React.FC<Props> = ({
  tokens
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const columns = useMemo(getColumns, [])
  const table = useReactTable({
    data: tokens,
    columns,
    state: {
      sorting,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽'
                        }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            <div>
                              {header.column.getCanFilter()
                                ? (
                                <div>
                                  <TableFilter column={header.column} table={table} />
                                </div>
                                  )
                                : null}
                            </div>
                            </>
                        )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return cell.column.id === 'logo'
                      ? (
                        <Icon key={cell.id} width={32} src={cell.getValue() as string} />
                        )
                      : (

                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                        )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <TokenTableFooter table={table} />
    </div>
  )
}

TokenTable.displayName = 'TokenTable'

export default TokenTable
