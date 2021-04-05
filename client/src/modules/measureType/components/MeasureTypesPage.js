import React from 'react'
import MeasureTypesListView from './MeasureTypesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getMeasureTypes,
  addMeasureType,
  updateMeasureType,
  deleteMeasureType,
  selectAllMeasureTypes,
  selectMeasureTypeById
} from '../measureTypesSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const MeasureTypesPage = () => {
  const MeasureTypesWrapped = withSearch(withCrud2(MeasureTypesListView))
  return (
    <MeasureTypesWrapped
      defaultSort={defaultSort}
      addItem={addMeasureType}
      getAllItems={getMeasureTypes}
      updateItem={updateMeasureType}
      deleteItem={deleteMeasureType}
      selectAllItems={selectAllMeasureTypes}
      selectItemById={selectMeasureTypeById}
    />
  )
}

export default MeasureTypesPage