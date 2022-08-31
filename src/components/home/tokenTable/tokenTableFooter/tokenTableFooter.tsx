import React from 'react'
import { Table } from '@tanstack/react-table'
import classNames from 'classnames'
import style from './style.module.scss'

interface Props {
  table: Table<Token>
  className?: string
}

const TokenTableFooter: React.FC<Props> = ({
  table,
  className
}) => {
  return (
    <div className={classNames(style.footer, className)}>
      <div className={style.content}>
        <div>
          <button
            className={style.pageButton}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className={style.pageButton}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
        </div>
        <span className={style.pageNumber}>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <div>
          <button
            className={style.pageButton}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className={style.pageButton}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <span className={style.goTo}>
          Go to page
          <input
            className={style.inputText}
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = (e.target.value.length > 0) ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>
        <select
          className={style.select}
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div className={style.numberOfRow}>{table.getPrePaginationRowModel().rows.length} Rows</div>
      </div>
    </div>
  )
}

TokenTableFooter.displayName = 'TokenTableFooter'

export default TokenTableFooter
