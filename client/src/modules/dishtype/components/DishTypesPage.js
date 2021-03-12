import React from 'react'
import { connect } from 'react-redux'
import DishTypesListView from './DishTypesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveDishType,
  getDishTypes,
  deleteDishType
} from '../dishTypeActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const DishTypesPage = props => {
  const DishTypesWrapped = withSearch(withCrud(DishTypesListView))
  return (
    <DishTypesWrapped
      repository={'dishTypes'}
      defaultSort={defaultSort}
      addItem={props.saveDishType}
      getAllItems={props.getDishTypes}
      updateItem={props.saveDishType}
      deleteItem={props.deleteDishType}
    />
  )
}

export default connect(
  null,
  {
    saveDishType,
    getDishTypes,
    deleteDishType
  }
)(DishTypesPage)