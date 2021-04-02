import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'
import {
  getRegions,
  selectAllRegionsWithCountry
} from '../regionsSlice'

const RegionsListView = (props) => {
  const dispatch = useDispatch()
  const allRegions = useSelector(selectAllRegionsWithCountry)

  const regionsStatus = useSelector((state) => state.regions.status)
  const error = useSelector((state) => state.regions.error)

  useEffect(() => {
    if (regionsStatus === 'idle') {
    dispatch(getRegions())
    }
  }, [regionsStatus, dispatch])

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/regions/edit/${id}`)
    } else {
      history.push('/regions/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = allRegions
    if (props.searchPhraseToUse.length > 0) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allRegions, props.searchPhraseToUse])

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
        Header: '',
        accessor: 'delete',
        Cell: (item) => (
          <LimonelloButton
            onClick={(e) => props.handleDeleteRequest(
              item.row.original,
              e,
              { countryId: item.row.original.country._id }
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
    []
  )

  return (
    <React.Fragment>
      <PageBar
        headerText='Alueet'
        addBtnText='Lisää alue'
        handleOpenEditPage={handleOpenEditPage}
        searchPhrase={props.searchPhrase}
        handlePhraseChange={props.handlePhraseChange}
        handleSearch={props.handleSearch}
      />

      <LimonelloDataTable
        columns={columns}
        data={getData}
        handleRowClick={handleRowClick}
      />

      {props.renderDeletionConfirmation()}
    </React.Fragment>
  )
}

export default withRouter(RegionsListView)