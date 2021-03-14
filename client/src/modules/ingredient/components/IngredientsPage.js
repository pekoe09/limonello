import React from 'react'
import { connect } from 'react-redux'
import IngredientsListView from './IngredientsListView'
import { withCrud, withSearch } from '../../core'
import {
  saveIngredient,
  getIngredients,
  deleteIngredient
} from '../ingredientActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const IngredientsPage = props => {
  const IngredientsWrapped = withSearch(withCrud(IngredientsListView))
  return (
    <IngredientsWrapped
      repository={'ingredients'}
      defaultSort={defaultSort}
      addItem={props.saveIngredient}
      getAllItems={props.getIngredients}
      updateItem={props.saveIngredient}
      deleteItem={props.deleteIngredient}
    />
  )
}

export default connect(
  null,
  {
    saveIngredient,
    getIngredients,
    deleteIngredient
  }
)(IngredientsPage)