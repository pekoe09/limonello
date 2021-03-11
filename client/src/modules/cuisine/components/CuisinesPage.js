import React from 'react'
import { connect } from 'react-redux'
import CuisinesListView from './CuisinesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveCuisine,
  getCuisines,
  deleteCuisine
} from '../cuisineActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const CuisinesPage = props => {
  const CuisinesWrapped = withSearch(withCrud(CuisinesListView))
  return (
    <CuisinesWrapped
      repository={'cuisines'}
      defaultSort={defaultSort}
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
)(CuisinesPage)