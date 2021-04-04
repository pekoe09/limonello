import React from 'react'
import FoodstuffEditView from './FoodstuffEditView'
import { withCrud2 } from '../../core'
import {
  getFoodstuffs,
  addFoodstuff,
  updateFoodstuff,
  deleteFoodstuff,
  selectAllFoodstuffs,
  selectFoodstuffById
} from '../foodStuffsSlice'

const FoodstuffEditPage = props => {
  const FoodstuffEditWrapped = withCrud2(FoodstuffEditView)
  return (
    <FoodstuffEditWrapped
      defaultSort={() => { }}
      addItem={addFoodstuff}
      getAllItems={getFoodstuffs}
      updateItem={updateFoodstuff}
      deleteItem={deleteFoodstuff}
      selectItemById={selectFoodstuffById}
      selectAllItems={selectAllFoodstuffs}
    />
  )
}

export default FoodstuffEditPage