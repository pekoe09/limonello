import React from 'react'
import { connect } from 'react-redux'
import WineTypesListView from './WineTypesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveWineType,
  getWineTypes,
  deleteWineType
} from '../wineTypeActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const WineTypesPage = props => {
  const WineTypesWrapped = withSearch(withCrud(WineTypesListView))
  return (
    <WineTypesWrapped
      repository={'wineTypes'}
      defaultSort={defaultSort}
      addItem={props.saveWineType}
      getAllItems={props.getWineTypes}
      updateItem={props.saveWineType}
      deleteItem={props.deleteWineType}
    />
  )
}

export default connect(
  null,
  {
    saveWineType,
    getWineTypes,
    deleteWineType
  }
)(WineTypesPage)