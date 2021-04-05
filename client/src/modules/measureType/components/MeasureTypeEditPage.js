import React from 'react'
import MeasureTypeEditView from './MeasureTypeEditView'
import { withCrud2 } from '../../core'
import {
  getMeasureTypes,
  addMeasureType,
  updateMeasureType,
  deleteMeasureType,
  selectAllMeasureTypes,
  selectMeasureTypeById
} from '../measureTypesSlice'

const MeasureTypeEditPage = () => {
  const MeasureTypeEditWrapped = withCrud2(MeasureTypeEditView)
  return (
    <MeasureTypeEditWrapped
      defaultSort={() => { }}
      addItem={addMeasureType}
      getAllItems={getMeasureTypes}
      updateItem={updateMeasureType}
      deleteItem={deleteMeasureType}
      selectItemById={selectMeasureTypeById}
      selectAllItems={selectAllMeasureTypes}
    />
  )
}

export default MeasureTypeEditPage