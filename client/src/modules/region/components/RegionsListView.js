import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { makeGetRegionsWithCountry } from '../regionSelector'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function RegionsListView(props) {
  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/regions/edit/${id}`)
    } else {
      history.push('/regions/create')
    }
  }

  const handleRowClick = (row) => {
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.regions
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.regions.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [props.regions, props.searchPhraseToUse])

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

const makeMapStateToProps = () => {
  const getRegionsWithCountry = makeGetRegionsWithCountry()
  return store => {
    const regions = getRegionsWithCountry(store)
    console.log('received regions', regions)
    return {
      regions,
      loading: store.regions.loading,
      error: store.regions.error
    }
  }
}

export default withRouter(connect(
  makeMapStateToProps
)(RegionsListView))