import React from 'react'
import { connect } from 'react-redux'
import BeerDetailsView from './BeerDetailsView'
import { withCrud } from '../../core'
import {
  saveBeer,
  getBeers,
  deleteBeer
} from '../beerActions'

const BeerDetailsPage = props => {
  const id = null
  console.log('beer details props', props)

  const BeerDetailsWrapped = withCrud(BeerDetailsView)
  return (
    <BeerDetailsWrapped
      repository={'beers'}
      id={id}
      defaultSort={() => { }}
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
)(BeerDetailsPage)