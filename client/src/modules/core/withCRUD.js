import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { DeletionConfirmation } from './index'

const addCRUDs = (WrappedComponent) => props => {
  const {
    items,
    addItem,
    getAllItems,
    updateItem,
    deleteItem,
    error,
    ...rest
  } = props

  const [deletionTargetId, setDeletionTargetId] = useState('')
  const [deletionTargetName, setDeletionTargetName] = useState('')
  const [deletionConfirmationIsOpen, setDeletionConfirmationIsOpen] = useState(false)

  useEffect(() => {
    (async function getData() {
      await getAllItems()
    })()
  }, [])

  const [modalError, setModalError] = useState('')

  const handleSave = async (item) => {
    if (item._id) {
      await updateItem(item)
    } else {
      await addItem(item)
    }
    if (error) {
      setModalError('Could not save the item')
    }
  }

  let editItem = null
  if (props.id) {
    editItem = items[props.id]
  }

  const handleDeleteRequest = (item, e) => {
    e.stopPropagation()
    setDeletionTargetId(item._id)
    setDeletionTargetName(item.name)
    setDeletionConfirmationIsOpen(true)
  }

  const handleDeleteConfirmation = async (isConfirmed) => {
    if (isConfirmed) {
      await handleDelete(deletionTargetId)
    }
    setDeletionConfirmationIsOpen(false)
    setDeletionTargetId('')
    setDeletionTargetName('')
  }

  const handleDelete = async (itemId) => {
    await deleteItem(itemId)
    if (error) {
      setModalError('Could not delete the item')
    }
  }

  const renderDeletionConfirmation = () => {
    return (
      <DeletionConfirmation
        headerText={`Deleting ${deletionTargetName}`}
        bodyText='Are you sure you want to go ahead and delete this?'
        modalIsOpen={deletionConfirmationIsOpen}
        closeModal={handleDeleteConfirmation}
      />
    )
  }

  const showError = error => setModalError(error)

  return (
    <WrappedComponent
      items={items}
      item={editItem}
      handleSave={handleSave}
      handleDeleteRequest={handleDeleteRequest}
      renderDeletionConfirmation={renderDeletionConfirmation}
      showError={showError}
      modalError={modalError}
      {...rest}
    />
  )
}

const mapStateToProps = (store, ownProps) => {
  return {
    items: Object.entries(store[ownProps.repository].byId).sort(ownProps.defaultSort),
    error: store[ownProps.repository].error
  }
}

const withCRUD = compose(
  connect(mapStateToProps, null),
  addCRUDs
)

export default withCRUD

withCRUD.propTypes = {
  repository: PropTypes.string.isRequired,
  id: PropTypes.string,
  defaultSort: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  getAllItems: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}