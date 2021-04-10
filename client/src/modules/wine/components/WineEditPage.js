import React from 'react'
import WineEditView from './WineEditView'
import { withCrud2 } from '../../core'
import {
  getWines,
  addWine,
  updateWine,
  deleteWine,
  selectAllWinesWithDetails,
  selectWineById
} from '../winesSlice'

const WineEditPage = props => {
  const WineEditWrapped = withCrud2(WineEditView)
  return (
    <WineEditWrapped
      defaultSort={() => { }}
      addItem={addWine}
      getAllItems={getWines}
      updateItem={updateWine}
      deleteItem={deleteWine}
      selectItemById={selectWineById}
      selectAllItems={selectAllWinesWithDetails}
    />
  )
}

export default WineEditPage