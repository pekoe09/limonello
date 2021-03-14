import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { makeGetMeasuresWithType } from '../measureSelector'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function MeasuresListView(props) {
  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/measures/edit/${id}`)
    } else {
      history.push('/measures/create')
    }
  }

  const handleRowClick = (row) => {
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.measures
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.measures.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [props.measures, props.searchPhraseToUse])

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
        Header: 'Lyhenne',
        accessor: 'abbreviation',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: 'Tyyppi',
        accessor: 'measureType.name',
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
              { measureTypeId: item.row.original.measureType._id }
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
        headerText='Mitat'
        addBtnText='Lisää mitta'
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
  const getMeasuresWithCountry = makeGetMeasuresWithType()
  return store => {
    const measures = getMeasuresWithCountry(store)
    console.log('received measures', measures)
    return {
      measures,
      loading: store.measures.loading,
      error: store.measures.error
    }
  }
}

export default withRouter(connect(
  makeMapStateToProps
)(MeasuresListView))