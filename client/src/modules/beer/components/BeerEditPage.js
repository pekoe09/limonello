import React from 'react'
import { connect } from 'react-redux'
import BeerEditView from './BeerEditView'
import { withCrud } from '../../core'
import {
  saveBeer,
  getBeers,
  deleteBeer
} from '../beerActions'

const BeerEditPage = props => {
  const id = null

  const BeerEditWrapped = withCrud(BeerEditView)
  return (
    <BeerEditWrapped
      repository={'beers'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveBeer}
      getAllItems={props.getBeers}
      updateItem={props.saveBeer}
      deleteItem={props.deleteBeer}
    />
  )
}

export default connect(
  null,
  {
    saveBeer,
    getBeers,
    deleteBeer
  }
)(BeerEditPage)