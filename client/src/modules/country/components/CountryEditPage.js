import React from 'react'
import CountryEditView from './CountryEditView'
import { withCrud2 } from '../../core'
import {
  getCountries,
  addCountry,
  updateCountry,
  deleteCountry,
  selectAllCountries,
  selectCountryById
} from '../countriesSlice'

const CountryEditPage = () => {
  const CountryEditWrapped = withCrud2(CountryEditView)
  return (
    <CountryEditWrapped
      defaultSort={() => { }}
      addItem={addCountry}
      getAllItems={getCountries}
      updateItem={updateCountry}
      deleteItem={deleteCountry}
      selectItemById={selectCountryById}
      selectAllItems={selectAllCountries}
    />
  )
}

export default CountryEditPage