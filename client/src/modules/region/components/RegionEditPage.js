import React from 'react'
import RegionEditView from './RegionEditView'
import { withCrud2 } from '../../core'
import {
  getRegions,
  addRegion,
  updateRegion,
  deleteRegion,
  selectAllRegions,
  selectRegionById
} from '../regionsSlice'

const RegionEditPage = () => {
  const RegionEditWrapped = withCrud2(RegionEditView)
  return (
    <RegionEditWrapped
      defaultSort={() => { }}
      addItem={addRegion}
      getAllItems={getRegions}
      updateItem={updateRegion}
      deleteItem={deleteRegion}
      selectItemById={selectRegionById}
      selectAllItems={selectAllRegions}
    />
  )
}

export default RegionEditPage