import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'
import {
  getDishTypes,
  selectAllDishTypes
} from '../dishTypesSlice'

const DishTypesListView = ({
  searchPhrase,
  searchPhraseToUse,
  handlePhraseChange,
  handleSearch,
  handleDeleteRequest,
  renderDeletionConfirmation
}) => {
  const dispatch = useDispatch()
  const allDishTypes = useSelector(selectAllDishTypes)

  const dishTypesStatus = useSelector((state) => state.dishTypes.status)
  const error = useSelector((state) => state.dishTypes.error)

  useEffect(() => {
    if (dishTypesStatus === 'idle') {
      dispatch(getDishTypes())
    }
  }, [dishTypesStatus, dispatch])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/dishtypes/edit/${id}`)
    } else {
      history.push('/dishtypes/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = allDishTypes
    if (searchPhraseToUse.length > 0) {
      filtered = filtered(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allDishTypes, searchPhraseToUse])

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
    []
  )

  return (
    <React.Fragment>
      <PageBar
        headerText='Ruokatyypit'
        addBtnText='Lisää ruokatyyppi'
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

export default withRouter(DishTypesListView)