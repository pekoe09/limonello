import React from 'react'
import { connect } from 'react-redux'
import BeersListView from './BeersListView'
import { withCrud, withSearch } from '../../core'
import {
  saveBeer,
  getBeers,
  deleteBeer
} from '../beerActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const BeersPage = props => {
  const BeersWrapped = withSearch(withCrud(BeersListView))
  return (
    <BeersWrapped
      repository={'beers'}
      defaultSort={defaultSort}
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
)(BeersPage)