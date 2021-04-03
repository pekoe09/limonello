import React from 'react'
import CuisinesListView from './CuisinesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getCuisines,
  addCuisine,
  updateCuisine,
  deleteCuisine,
  selectAllCuisines,
  selectCuisineById
} from '../cuisinesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const CuisinesPage = () => {
  const CuisinesWrapped = withSearch(withCrud2(CuisinesListView))
  return (
    <CuisinesWrapped
      defaultSort={defaultSort}
      addItem={addCuisine}
      getAllItems={getCuisines}
      updateItem={updateCuisine}
      deleteItem={deleteCuisine}
      selectAllItem={selectAllCuisines}
      selectItemById={selectCuisineById}
    />
  )
}

export default CuisinesPage