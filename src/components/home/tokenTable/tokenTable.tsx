import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { getCellType, getColumns } from './tokenTable.utils'
import Icon from 'components/fragments/icon/icon'
import TableCell from 'components/fragments/tableCell/tableCell'
import TableFilter from 'components/fragments/tableFilter/tableFilter'
import TokenTableFooter from './tokenTableFooter/tokenTableFooter'
import style from './style.module.scss'

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
    <div className={style.container}>
      <table className={style.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div className={style.headerCellContent}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <>
                      <div
                        onClick={header.column.getToggleSortingHandler}
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
                              {header.column.getCanFilter() && (
                                <div>
                                  <TableFilter column={header.column} table={table} />
                                </div>
                              )}
                            </div>
                            </>
                        )}
                        </div>
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
                        <td className={style.cell} key={cell.id}>
                          <Icon width={32} src={cell.getValue() as string} />
                        </td>
                        )
                      : (
                      <TableCell type={getCellType(cell.column.id)} className={style.cell} content={cell.getValue() as string | number} key={cell.id} />
                        )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <TokenTableFooter className={style.tableFooter} table={table} />
    </div>
  )
}

TokenTable.displayName = 'TokenTable'

export default TokenTable
