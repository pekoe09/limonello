import React from 'react'
import { connect } from 'react-redux'
import CuisineEditView from './CuisineEditView'
import { withCrud } from '../../core'
import {
  saveCuisine,
  getCuisines,
  deleteCuisine
} from '../cuisineActions'

const CuisineEditPage = props => {
  const id = null

  const CuisineEditWrapped = withCrud(CuisineEditView)
  return (
    <CuisineEditWrapped
      repository={'cuisines'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveCuisine}
      getAllItems={props.getCuisines}
      updateItem={props.saveCuisine}
      deleteItem={props.deleteCuisine}
    />
  )
}

export default connect(
  null,
  {
    saveCuisine,
    getCuisines,
    deleteCuisine
  }
)(CuisineEditPage)