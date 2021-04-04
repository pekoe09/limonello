import React from 'react'
import BeerTypeEditView from './BeerTypeEditView'
import { withCrud2 } from '../../core'
import {
  getBeerTypes,
  addBeerType,
  updateBeerType,
  deleteBeerType,
  selectAllBeerTypes,
  selectBeerTypeById
} from '../beerTypesSlice'

const BeerTypeEditPage = () => {
  const BeerTypeEditWrapped = withCrud2(BeerTypeEditView)
  return (
    <BeerTypeEditWrapped
      defaultSort={() => { }}
      addItem={addBeerType}
      getAllItems={getBeerTypes}
      updateItem={updateBeerType}
      deleteItem={deleteBeerType}
      selectItemById={selectBeerTypeById}
      selectAllItems={selectAllBeerTypes}
    />
  )
}

export default BeerTypeEditPage