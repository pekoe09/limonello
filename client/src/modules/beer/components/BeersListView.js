import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { makeGetBeersWithCountryAndType } from '../beerSelector'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function BeersListView(props) {
  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/beers/details/${id}`)
    } else {
      history.push('/beers/create')
    }
  }

  const handleRowClick = (row) => {
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.beers
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.beers.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [props.beers, props.searchPhraseToUse])

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
        accessor: 'beerType.name',
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
              {
                countryId: item.row.original.country._id,
                beerTypeId: item.row.original.beerType._id
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
    []
  )

  return (
    <React.Fragment>
      <PageBar
        headerText='Oluet'
        addBtnText='Lisää olut'
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
  const getBeersWithCountry = makeGetBeersWithCountryAndType()
  return store => {
    const beers = getBeersWithCountry(store)
    console.log('received beers', beers)
    return {
      beers,
      loading: store.beers.loading,
      error: store.beers.error
    }
  }
}

export default withRouter(connect(
  makeMapStateToProps
)(BeersListView))