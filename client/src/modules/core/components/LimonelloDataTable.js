import React from 'react'
import {
  useTable,
  useFlexLayout,
  usePagination,
  useSortBy
} from 'react-table'
import LimonelloButton from './LimonelloButton'

const LimonelloDataTable = ({ columns, data, handleRowClick }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30, width: 150, maxWidth: 200
    }), []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 }
    },
    useFlexLayout,
    useSortBy,
    usePagination
  )

  return (
    <>      
      <table {...getTableProps} className='rt-table'>
        <thead className='rt-thead'>
          <tr className='rt-tr'>
            {headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps)} className='rt-th'>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps} className='rt-tbody'>
          {page.map(
            (row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps({ onClick: () => handleRowClick(row) })} className='rt-tr'>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} className='rt-td'>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            }
          )}
        </tbody>
      </table>

      <div className='rt-pagination'>
        <LimonelloButton 
          onClick={() => gotoPage(0)} 
          disabled={!canPreviousPage}
          className='rt-paginationbutton'
        >
          {'<<'}
        </LimonelloButton>{' '}
        <LimonelloButton 
          onClick={() => previousPage()} 
          disabled={!canPreviousPage}
          className='rt-paginationbutton'
        >
          {'<'}
        </LimonelloButton>{' '}
        
        <span>
          Page{' '}
          {pageIndex + 1} of {pageOptions.length}
          {' '}
        </span>
        <span>
          | Go to page: {' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            max={pageCount}
            min={1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '50px' }}
          />{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          style={{
            background: '#007BFF',
            border: "none",
            padding: "6px 12px",
            margin: "0 5px 0 0",
            color: "white"}}
        >
          {[10, 30, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>{' '}
        <LimonelloButton 
          onClick={() => nextPage()} 
          disabled={!canNextPage} 
          className='rt-paginationbutton'
        >
          {'>'}
        </LimonelloButton>{' '}
        <LimonelloButton 
          onClick={() => gotoPage(pageCount - 1)} 
          disabled={!canNextPage} 
          className='rt-paginationbutton'
        >
          {'>>'}
        </LimonelloButton>{' '}
      </div>
    </>
  )
}

export default LimonelloDataTable