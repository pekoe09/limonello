import React from 'react'
import FoodstuffsListView from './FoodstuffsListView'
import { withCrud2, withSearch } from '../../core'
import {
  getFoodstuffs,
  addFoodstuff,
  updateFoodstuff,
  deleteFoodstuff,
  selectAllFoodstuffs,
  selectFoodstuffById
} from '../foodStuffsSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const FoodstuffsPage = () => {
  const FoodstuffsWrapped = withSearch(withCrud2(FoodstuffsListView))
  return (
    <FoodstuffsWrapped
      defaultSort={defaultSort}
      addItem={addFoodstuff}
      getAllItems={getFoodstuffs}
      updateItem={updateFoodstuff}
      deleteItem={deleteFoodstuff}
      selectAllItems={selectAllFoodstuffs}
      selectItemById={selectFoodstuffById}
    />
  )
}

export default FoodstuffsPage