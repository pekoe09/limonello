import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

const CuisinesListView = ({
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
  const allCuisines = useSelector(selectAllItems)

  const cuisinesStatus = useSelector((state) => state.cuisines.status)
  const error = useSelector((state) => state.cuisines.error)

  useEffect(() => {
    if (cuisinesStatus === 'idle') {
      dispatch(getAllItems())
    }
  }, [cuisinesStatus, dispatch, getAllItems])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/cuisines/edit/${id}`)
    } else {
      history.push('/cuisines/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = allCuisines
    if (searchPhraseToUse.length > 0) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allCuisines, searchPhraseToUse])

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
        Header: '',
        accessor: 'delete',
        Cell: (item) => (
          <LimonelloButton
            onClick={(e) => handleDeleteRequest(item.row.original, e)}
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
        headerText='Keittiöt'
        addBtnText='Lisää keittiö'
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

export default withRouter(CuisinesListView)