import React from 'react'
import BeerEditView from './BeerEditView'
import { withCrud2 } from '../../core'
import {
  getBeers,
  addBeer,
  updateBeer,
  deleteBeer,
  selectAllBeersWithTypeAndCountry,
  selectBeerById
} from '../beersSlice'

const BeerEditPage = props => {
  const BeerEditWrapped = withCrud2(BeerEditView)
  return (
    <BeerEditWrapped
      defaultSort={() => {}}
      addItem={addBeer}
      getAllItems={getBeers}
      updateItem={updateBeer}
      deleteItem={deleteBeer}
      selectItemById={selectBeerById}
      selectAllItems={selectAllBeersWithTypeAndCountry}
    />
  )
}

export default BeerEditPage