import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'

import {
  LimonelloButton,
  LimonelloDataTable,
  DeletionConfirmation,
  PageBar
} from '../../core'
// import '../common/alexandria-react-table.css'

function CountriesList(props) {
  const [rowToEdit, setRowToEdit] = useState(null)
  const [relatedRegions, setRelatedRegions] = useState([])
  const [deletionTargetId, setDeletionTargetId] = useState('')
  const [deletionTargetName, setDeletionTargetName] = useState('')
  const [deletionConfirmationIsOpen, setDeletionConfirmationIsOpen] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')
  const [searchPhraseToUse, setSearchPhraseToUse] = useState('')

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    setRowToEdit(id)
    if (id) {
      history.push({
        pathname: '/countries/edit',
        search: `?id=${id}`
      })
    } else {
      history.push('/countries/create')
    }
  }

  const handleRowClick = (row) => {
    // setRelatedRegions(getRelatedRegions(row.original._id))
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  //TODO: delete stuff could be in a separate component

  const handleDeleteRequest = (item, e) => {
    e.stopPropagation()
    setDeletionTargetId(item._id)
    setDeletionTargetName(item.name)
    setDeletionConfirmationIsOpen(true)
  }

  const handleDeleteConfirmation = async (isConfirmed) => {
    if (isConfirmed) {
      await props.handleDelete(deletionTargetId)
    }
    setDeletionConfirmationIsOpen(false)
    setDeletionTargetId('')
    setDeletionTargetName('')
  }

  //TODO: search-related generic stuff could be in a separate component

  const handlePhraseChange = searchPhraseEvent => {
    let searchPhrase = searchPhraseEvent.target.value
    if (searchPhrase.trim().length > 0) {
      setSearchPhrase(searchPhrase)
    } else {
      setSearchPhrase('')
    }
  }

  const handleSearch = () => {
    setSearchPhraseToUse(searchPhrase)
  }

  // const getRelatedRegions = (countryId) => {
  //   return props.regions.filter(r => r.country && r.country._id === countryId)
  // }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = props.items.map(i => i[1])
    if (searchPhraseToUse.length > 0) {
      filtered = props.items.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }
    console.log('found countries:', filtered)
    return filtered
  }, [props.items, searchPhraseToUse])

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
            onClick={(e) => handleDeleteRequest(item.row.original, e)}
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
        searchPhrase={searchPhrase}
        handlePhraseChange={handlePhraseChange}
        handleSearch={handleSearch}
      />

      <LimonelloDataTable
        columns={columns}
        data={getData}
        handleRowClick={handleRowClick}
      />

      <DeletionConfirmation
        headerText={`Deleting ${deletionTargetName}`}
        bodyText='Are you sure you want to go ahead and delete this?'
        modalIsOpen={deletionConfirmationIsOpen}
        closeModal={handleDeleteConfirmation}
      />
    </React.Fragment>
  )

}

const mapStateToProps = store => ({
  countries: store.countries.items,
  loading: store.countries.loading,
  error: store.countries.error
})

export default withRouter(connect(
  mapStateToProps
)(CountriesList))