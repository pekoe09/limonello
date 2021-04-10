import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

const GrapesListView = ({
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
  const allGrapes = useSelector(selectAllItems)

  const grapesStatus = useSelector(state => state.grapes.status)
  const error = useSelector(state => state.grapes.error)

  useEffect(() => {
    if (grapesStatus === 'idle') {
      dispatch(getAllItems())
    }
  }, [grapesStatus, dispatch, getAllItems])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/grapes/edit/${id}`)
    } else {
      history.push('/grapes/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = allGrapes
    if (searchPhraseToUse.length > 0) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allGrapes, searchPhraseToUse])

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
        headerText='Rypäleet'
        addBtnText='Lisää rypäle'
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

export default withRouter(GrapesListView)