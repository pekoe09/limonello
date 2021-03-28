import React from 'react'
import CountriesListView from './CountriesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getCountries,
  addCountry,
  updateCountry,
  deleteCountry, 
  selectAllCountries,
  selectCountryById
} from '../countriesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const CountriesPage = () => {
  const CountriesWrapped = withSearch(withCrud2(CountriesListView))
  return (
    <CountriesWrapped
      defaultSort={defaultSort}
      addItem={addCountry}
      getAllItems={getCountries}
      updateItem={updateCountry}
      deleteItem={deleteCountry}
      selectAllItems={selectAllCountries}
      selectItemById={selectCountryById}
    />
  )
}

export default CountriesPage