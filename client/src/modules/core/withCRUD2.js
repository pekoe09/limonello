import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { DeletionConfirmation } from './index'

const withCRUD = (WrappedComponent) => props => {
  const {
    addItem,
    getAllItems,
    updateItem,
    deleteItem,
    selectAllItems,
    selectItemById,
    ...rest
  } = props

  const dispatch = useDispatch()

  const [deletionTargetId, setDeletionTargetId] = useState('')
  const [deletionTargetName, setDeletionTargetName] = useState('')
  const [deletionOther, setDeletionOther] = useState({})
  const [deletionConfirmationIsOpen, setDeletionConfirmationIsOpen] = useState(false)

  useEffect(() => {
    (async function getData() {
      await getAllItems()
    })()
  }, [getAllItems])

  const handleSave = async (item) => {
    console.log('hit handleSave', item)
    let result
    if (item._id) {
      result = await dispatch(updateItem({ id: item._id, changes: item }))
    } else {
      result = await dispatch(addItem(item))
    }
    unwrapResult(result)
  }

  const handleDeleteRequest = (item, e, other) => {
    e.stopPropagation()
    setDeletionTargetId(item._id)
    setDeletionTargetName(item.name)
    setDeletionOther(other)
    setDeletionConfirmationIsOpen(true)
  }

  const handleDeleteConfirmation = async (isConfirmed) => {
    if (isConfirmed) {
      await handleDelete()
    }
    setDeletionConfirmationIsOpen(false)
    setDeletionTargetId('')
    setDeletionTargetName('')
  }

  const handleDelete = async () => {
    await dispatch(deleteItem(deletionTargetId, deletionOther))
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

  return (
    <WrappedComponent
      handleSave={handleSave}
      handleDeleteRequest={handleDeleteRequest}
      renderDeletionConfirmation={renderDeletionConfirmation}
      selectAllItems={selectAllItems}
      selectItemById={selectItemById}
      {...rest}
    />
  )
}

export default withCRUD

withCRUD.propTypes = {
  defaultSort: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  getAllItems: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  selectAllItems: PropTypes.func,
  selectItemById: PropTypes.func
}