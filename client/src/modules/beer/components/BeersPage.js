import React from 'react'
import BeersListView from './BeersListView'
import { withCrud2, withSearch } from '../../core'
import {
  getBeers,
  addBeer,
  updateBeer,
  deleteBeer,
  selectAllBeersWithTypeAndCountry,
  selectBeerById
} from '../beersSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const BeersPage = () => {
  const BeersWrapped = withSearch(withCrud2(BeersListView))
  return (
    <BeersWrapped
      defaultSort={defaultSort}
      addItem={addBeer}
      getAllItems={getBeers}
      updateItem={updateBeer}
      deleteItem={deleteBeer}
      selectAllItems={selectAllBeersWithTypeAndCountry}
      selectItemById={selectBeerById}
    />
  )
}

export default BeersPage