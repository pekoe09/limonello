import React from 'react'
import WinesListView from './WinesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getWines,
  addWine,
  updateWine,
  deleteWine,
  selectAllWinesWithDetails,
  selectWineById
} from '../winesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const WinesPage = () => {
  const WinesWrapped = withSearch(withCrud2(WinesListView))
  return (
    <WinesWrapped
      defaultSort={defaultSort}
      addItem={addWine}
      getAllItems={getWines}
      updateItem={updateWine}
      deleteItem={deleteWine}
      selectAllItems={selectAllWinesWithDetails}
      selectItemById={selectWineById}
    />
  )
}

export default WinesPage