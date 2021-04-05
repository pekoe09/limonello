import React from 'react'
import IngredientEditView from './IngredientEditView'
import { withCrud2 } from '../../core'
import {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  selectAllIngredientsWithFoodstuff,
  selectIngredientById
} from '../ingredientsSlice'

const IngredientEditPage = () => {
  const IngredientEditWrapped = withCrud2(IngredientEditView)
  return (
    <IngredientEditWrapped
      defaultSort={() => { }}
      addItem={addIngredient}
      getAllItems={getIngredients}
      updateItem={updateIngredient}
      deleteItem={deleteIngredient}
      selectItemById={selectIngredientById}
      selectAllItems={selectAllIngredientsWithFoodstuff}
    />
  )
}

export default IngredientEditPage