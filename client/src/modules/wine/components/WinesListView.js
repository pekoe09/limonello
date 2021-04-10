import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

const WinesListView = ({
  getAllItems,
  selectAllItems,
  searchPhrase,
  searchPhraseToUse,
  handlePhraseChange,
  handleSearch,
  handleDeleteRequest,
  renderDeletionConfirmation
}) => {
  const dispatch = useDispatch()
  const allWines = useSelector(selectAllItems)

  const winesStatus = useSelector(state => state.wines.status)
  const error = useSelector(state => state.wines.error)

  useEffect(() => {
    if (winesStatus === 'idle') {
      dispatch(getAllItems())
    }
  }, [winesStatus, dispatch, getAllItems])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/wines/details/${id}`)
    } else {
      history.push('/wines/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = allWines
    if (searchPhraseToUse.length > 0) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allWines, searchPhraseToUse])

  const getData = React.useMemo(() => getFilteredItems(), [getFilteredItems])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nimi',
        accessor: 'name',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: 'Maa',
        accessor: 'country.name',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: 'Tyyppi',
        accessor: 'wineType.name',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: '',
        accessor: 'delete',
        Cell: (item) => (
          <LimonelloButton
            onClick={(e) => handleDeleteRequest(
              item.row.original,
              e,
              {
                countryId: item.row.original.country._id,
                wineTypeId: item.row.original.wineType._id
              }
            )}
            bsstyle='rowdanger'
          >
            Poista
          </LimonelloButton>
        ),
        style: {
          textAlign: 'center'
        },
        disableSortBy: false,
        filterable: false,
        maxWidth: 80
      }
    ],
    [handleDeleteRequest]
  )

  return (
    <React.Fragment>
      <PageBar
        headerText='Viinit'
        addBtnText='Lisää viini'
        handleOpenEditPage={handleOpenEditPage}
        searchPhrase={searchPhrase}
        handlePhraseChange={handlePhraseChange}
        handleSearch={handleSearch}
      />

      <LimonelloDataTable
        columns={columns}
        data={getData}
        handleRowClick={handleRowClick}
      />

      {renderDeletionConfirmation()}
    </React.Fragment>
  )
}

export default withRouter(WinesListView)