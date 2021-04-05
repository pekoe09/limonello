import React from 'react'
import BeerDetailsView from './BeerDetailsView'
import { withCrud2 } from '../../core'
import {
  getBeers,
  addBeer,
  updateBeer,
  deleteBeer,
  selectAllBeersWithTypeAndCountry,
  selectBeerById
} from '../beersSlice'

const BeerDetailsPage = () => {
  const BeerDetailsWrapped = withCrud2(BeerDetailsView)
  return (
    <BeerDetailsWrapped
      defaultSort={() => { }}
      addItem={addBeer}
      getAllItems={getBeers}
      updateItem={updateBeer}
      deleteItem={deleteBeer}
      selectItemById={selectBeerById}
      selectAllItems={selectAllBeersWithTypeAndCountry}
    />
  )
}

export default BeerDetailsPage