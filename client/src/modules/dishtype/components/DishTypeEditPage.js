import React from 'react'
import DishTypeEditView from './DishTypeEditView'
import { withCrud2 } from '../../core'
import {
  getDishTypes,
  addDishType,
  updateDishType,
  deleteDishType,
  selectAllDishTypes,
  selectDishTypeById
} from '../dishTypesSlice'

const DishTypeEditPage = () => {
  const DishTypeEditWrapped = withCrud2(DishTypeEditView)
  return (
    <DishTypeEditWrapped
      defaultSort={() => { }}
      addItem={addDishType}
      getAllItems={getDishTypes}
      updateItem={updateDishType}
      deleteItem={deleteDishType}
      selectItemById={selectDishTypeById}
      selectAllItems={selectAllDishTypes}
    />
  )
}

export default DishTypeEditPage