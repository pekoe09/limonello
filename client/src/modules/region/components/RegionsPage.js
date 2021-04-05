import React from 'react'
import RegionsListView from './RegionsListView'
import { withCrud2, withSearch } from '../../core'
import {
  getRegions,
  addRegion,
  updateRegion,
  deleteRegion,
  selectAllRegionsWithCountry,
  selectRegionById
} from '../regionsSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const RegionsPage = () => {
  const RegionsWrapped = withSearch(withCrud2(RegionsListView))
  return (
    <RegionsWrapped
      defaultSort={defaultSort}
      addItem={addRegion}
      getAllItems={getRegions}
      updateItem={updateRegion}
      deleteItem={deleteRegion}
      selectAllItems={selectAllRegionsWithCountry}
      selectItemById={selectRegionById}
    />
  )
}

export default RegionsPage