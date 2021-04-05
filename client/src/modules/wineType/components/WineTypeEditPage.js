import React from 'react'
import WineTypeEditView from './WineTypeEditView'
import { withCrud2 } from '../../core'
import {
  getWineTypes,
  addWineType,
  updateWineType,
  deleteWineType,
  selectAllWineTypes,
  selectWineTypeById
} from '../wineTypesSlice'

const WineTypeEditPage = props => {
  const WineTypeEditWrapped = withCrud2(WineTypeEditView)
  return (
    <WineTypeEditWrapped
      defaultSort={() => { }}
      addItem={addWineType}
      getAllItems={getWineTypes}
      updateItem={updateWineType}
      deleteItem={deleteWineType}
      selectAllItems={selectAllWineTypes}
      selectItemById={selectWineTypeById}
    />
  )
}

export default WineTypeEditPage