import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  LimonelloButton,
  LimonelloDataTable,
  DeletionConfirmation
} from '../../core'
// import '../common/alexandria-react-table.css'
// import ViewBar from '../common/ViewBar'
// import PublisherEdit from './PublisherEdit'

function CountriesList(props) {
  const [rowToEdit, setRowToEdit] = useState(null)
  const [relatedRegions, setRelatedRegions] = useState([])
  const [deletionTargetId, setDeletionTargetId] = useState('')
  const [deletionTargetName, setDeletionTargetName] = useState('')
  const [deletionConfirmationIsOpen, setDeletionConfirmationIsOpen] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')
  const [searchPhraseToUse, setSearchPhraseToUse] = useState('')

  // const toggleEditModalOpen = () => {
  //   props.showError('')
  //   setEditModalIsOpen(!editModalIsOpen)
  //   setRowToEdit(null)
  // }

  // const toggleBookModalOpen = () => {
  //   props.showError('')
  //   setBookModalIsOpen(!bookModalIsOpen)
  //   setCountryToEdit(null)
  // }

  const handleRowClick = (row) => {
    // setEditModalIsOpen(true)
    setRowToEdit(row.original)
    setRelatedRegions(getRelatedRegions(row.original._id))
    props.showError('')
  }

  // const handleCountryClick = (countryId) => {
  //   setCountryToEdit(relatedRegions.find(b => b._id === countryId))
  //   // setBookModalIsOpen(true)
  //   props.showError('')
  // }

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

  const getRelatedRegions = (countryId) => {
    return props.regions.filter(r => r.country && r.country._id === countryId)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = searchPhraseToUse.toLowerCase()
    let filtered = props.items
    if (searchPhraseToUse.length > 0) {
      filtered = props.items.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }
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
      <p>Countries list</p>
    </React.Fragment>
  )

}

const mapStateToProps = store => ({
  countries: store.countries.items,
  loading: store.countries.loading,
  error: store.coountries.error
})

export default withRouter(connect(
  mapStateToProps
)(CountriesList))