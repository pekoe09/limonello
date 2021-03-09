import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function CountriesListView(props) {
  const [rowToEdit, setRowToEdit] = useState(null)
  const [relatedRegions, setRelatedRegions] = useState([])
  console.log('testing', props)

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    setRowToEdit(id)
    if (id) {
      history.push(`/countries/edit/${id}`)
    } else {
      history.push('/countries/create')
    }
  }

  const handleRowClick = (row) => {
    // setRelatedRegions(getRelatedRegions(row.original._id))
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.items.map(i => i[1])
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.items.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }
    console.log('found countries:', filtered)
    return filtered
  }, [props.items, props.searchPhraseToUse])

  const getData = React.useMemo(() => getFilteredItems(), [getFilteredItems])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
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
            onClick={(e) => props.handleDeleteRequest(item.row.original, e)}
            bsstyle='rowdanger'
          >
            Delete
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
        headerText='Countries'
        addBtnText='New country'
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

const mapStateToProps = store => ({
  loading: store.countries.loading,
  error: store.countries.error
})

export default withRouter(connect(
  mapStateToProps
)(CountriesListView))