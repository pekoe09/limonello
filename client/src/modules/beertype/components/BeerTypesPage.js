import React from 'react'
import { connect } from 'react-redux'
import BeerTypesListView from './BeerTypesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveBeerType,
  getBeerTypes,
  deleteBeerType
} from '../beerTypeActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const BeerTypesPage = props => {
  const BeerTypesWrapped = withSearch(withCrud(BeerTypesListView))
  return (
    <BeerTypesWrapped
      repository={'beerTypes'}
      defaultSort={defaultSort}
      addItem={props.saveBeerType}
      getAllItems={props.getBeerTypes}
      updateItem={props.saveBeerType}
      deleteItem={props.deleteBeerType}
    />
  )
}

export default connect(
  null,
  {
    saveBeerType,
    getBeerTypes,
    deleteBeerType
  }
)(BeerTypesPage)