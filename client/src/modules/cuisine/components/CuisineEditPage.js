import React from 'react'
import CuisineEditView from './CuisineEditView'
import { withCrud2 } from '../../core'
import {
  getCuisines,
  addCuisine,
  updateCuisine,
  deleteCuisine,
  selectAllCuisines,
  selectCuisineById
} from '../cuisinesSlice'

const CuisineEditPage = () => {
  const CuisineEditWrapped = withCrud2(CuisineEditView)
  return (
    <CuisineEditWrapped
      defaultSort={() => { }}
      addItem={addCuisine}
      getAllItems={getCuisines}
      updateItem={updateCuisine}
      deleteItem={deleteCuisine}
      selectItemById={selectCuisineById}
      selectAllItems={selectAllCuisines}
    />
  )
}

export default CuisineEditPage