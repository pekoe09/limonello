import React from 'react'
import BeerTypesListView from './BeerTypesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getBeerTypes,
  addBeerType,
  updateBeerType,
  deleteBeerType,
  selectAllBeerTypes,
  selectBeerTypeById
} from '../beerTypesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const BeerTypesPage = () => {
  const BeerTypesWrapped = withSearch(withCrud2(BeerTypesListView))
  return (
    <BeerTypesWrapped
      defaultSort={defaultSort}
      addItem={addBeerType}
      getAllItems={getBeerTypes}
      updateItem={updateBeerType}
      deleteItem={deleteBeerType}
      selectAllItems={selectAllBeerTypes}
      selectItemById={selectBeerTypeById}
    />
  )
}

export default BeerTypesPage