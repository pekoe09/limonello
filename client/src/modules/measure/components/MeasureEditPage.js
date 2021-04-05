import React from 'react'
import MeasureEditView from './MeasureEditView'
import { withCrud2 } from '../../core'
import {
  getMeasures,
  addMeasure,
  updateMeasure,
  deleteMeasure,
  selectAllMeasuresWithType,
  selectMeasureById
} from '../measuresSlice'

const MeasureEditPage = () => {
  const MeasureEditWrapped = withCrud2(MeasureEditView)
  return (
    <MeasureEditWrapped
      defaultSort={() => { }}
      addItem={addMeasure}
      getAllItems={getMeasures}
      updateItem={updateMeasure}
      deleteItem={deleteMeasure}
      selectAllItems={selectAllMeasuresWithType}
      selectItemById={selectMeasureById}
    />
  )
}

export default MeasureEditPage