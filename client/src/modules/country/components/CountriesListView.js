import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'
import {
  getCountries,
  selectAllCountries
} from '../countriesSlice'

const CountriesListView = ({
  searchPhrase,
  searchPhraseToUse,
  handlePhraseChange,
  handleSearch, 
  handleDeleteRequest,
  renderDeletionConfirmation
}) => {
  const dispatch = useDispatch()
  const allCountries = useSelector(selectAllCountries)

  const countriesStatus = useSelector((state) => state.countries.status)
  const error = useSelector((state) => state.countries.error)

  useEffect(() => {
    if (countriesStatus === 'idle') {
      dispatch(getCountries())
    }
  }, [countriesStatus, dispatch])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/countries/edit/${id}`)
    } else {
      history.push('/countries/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = allCountries
    if (searchPhraseToUse.length > 0) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allCountries, searchPhraseToUse])

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
        headerText='Maat'
        addBtnText='Lisää maa'
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

export default withRouter(CountriesListView)