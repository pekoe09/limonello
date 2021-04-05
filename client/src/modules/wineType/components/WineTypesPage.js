import React from 'react'
import WineTypesListView from './WineTypesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getWineTypes,
  addWineType,
  updateWineType,
  deleteWineType,
  selectAllWineTypes,
  selectWineTypeById
} from '../wineTypesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const WineTypesPage = () => {
  const WineTypesWrapped = withSearch(withCrud2(WineTypesListView))
  return (
    <WineTypesWrapped
      defaultSort={defaultSort}
      addItem={addWineType}
      getAllItems={getWineTypes}
      updateItem={updateWineType}
      deleteItem={deleteWineType}
      selectAllItems={selectAllWineTypes}
      selectItemById={selectWineTypeById}
    />
  )
}

export default WineTypesPage