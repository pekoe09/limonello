import React from 'react'
import IngredientsListView from './IngredientsListView'
import { withCrud2, withSearch } from '../../core'
import {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  selectAllIngredientsWithFoodstuff,
  selectIngredientById
} from '../ingredientsSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const IngredientsPage = () => {
  const IngredientsWrapped = withSearch(withCrud2(IngredientsListView))
  return (
    <IngredientsWrapped
      defaultSort={defaultSort}
      addItem={addIngredient}
      getAllItems={getIngredients}
      updateItem={updateIngredient}
      deleteItem={deleteIngredient}
      selectAllItems={selectAllIngredientsWithFoodstuff}
      selectIngredientById={selectIngredientById}
    />
  )
}

export default IngredientsPage