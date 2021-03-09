import React from 'react'
import { connect } from 'react-redux'
import CountryEditView from './CountryEditView'
import { withCrud } from '../../core'
import {
  saveCountry,
  getCountries,
  deleteCountry
} from '../countryActions'

const CountryEditPage = props => {
  const id = null

  const CountryEditWrapped = withCrud(CountryEditView)
  return (
    <CountryEditWrapped
      repository={'countries'}
      id={id}
      defaultSort={() => {}}
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
)(CountryEditPage)