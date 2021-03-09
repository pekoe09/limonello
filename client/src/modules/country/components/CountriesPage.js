import React from 'react'
import { connect } from 'react-redux'
import CountriesListView from './CountriesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveCountry,
  getCountries,
  deleteCountry
} from '../countryActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const CountriesPage = props => {
  const CountriesWrapped = withSearch(withCrud(CountriesListView))
  return (
    <CountriesWrapped
      repository={'countries'}
      defaultSort={defaultSort}
      addItem={props.saveCountry}
      getAllItems={props.getCountries}
      updateItem={props.saveCountry}
      deleteItem={props.deleteCountry}
    />
  )
}

export default connect(
  null,
  {
    saveCountry,
    getCountries,
    deleteCountry
  }
)(CountriesPage)