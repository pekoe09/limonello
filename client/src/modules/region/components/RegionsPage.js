import React from 'react'
import { connect } from 'react-redux'
import RegionsListView from './RegionsListView'
import { withCrud, withSearch } from '../../core'
import {
  saveRegion,
  getRegions,
  deleteRegion
} from '../regionActions'
import {
  getCountries
} from '../../country/countryActions.js'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

// const getAllItems = () => {
//   return async (dispatch) => {
//     dispatch(getCountries)
//     dispatch(getRegions)
//   }
// }

const RegionsPage = props => {
  const RegionsWrapped = withSearch(withCrud(RegionsListView))
  return (
    <RegionsWrapped
      repository={'regions'}
      defaultSort={defaultSort}
      addItem={props.saveRegion}
      getAllItems={props.getRegions}
      updateItem={props.saveRegion}
      deleteItem={props.deleteRegion}
    />
  )
}

export default connect(
  null,
  {
    saveRegion,
    getRegions,
    deleteRegion
  }
)(RegionsPage)