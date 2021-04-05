import React from 'react'
import GrapesListView from './GrapesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getGrapes,
  addGrape,
  updateGrape,
  deleteGrape,
  selectAllGrapes,
  selectGrapeById
} from '../grapesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const GrapesPage = () => {
  const GrapesWrapped = withSearch(withCrud2(GrapesListView))
  return (
    <GrapesWrapped
      defaultSort={defaultSort}
      addItem={addGrape}
      getAllItems={getGrapes}
      updateItem={updateGrape}
      deleteItem={deleteGrape}
      selectAllItems={selectAllGrapes}
      selectGrapeById={selectGrapeById}
    />
  )
}

export default GrapesPage