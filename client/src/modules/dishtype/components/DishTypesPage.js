import React from 'react'
import DishTypesListView from './DishTypesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getDishTypes,
  addDishType,
  updateDishType,
  deleteDishType,
  selectAllDishTypes,
  selectDishTypeById
} from '../dishTypesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const DishTypesPage = () => {
  const DishTypesWrapped = withSearch(withCrud2(DishTypesListView))
  return (
    <DishTypesWrapped
      defaultSort={defaultSort}
      addItem={addDishType}
      getAllItems={getDishTypes}
      updateItem={updateDishType}
      deleteItem={deleteDishType}
      selectAllItems={selectAllDishTypes}
      selectItemById={selectDishTypeById}
    />
  )
}

export default DishTypesPage