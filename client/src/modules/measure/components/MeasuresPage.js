import React from 'react'
import MeasuresListView from './MeasuresListView'
import { withCrud2, withSearch } from '../../core'
import {
  getMeasures,
  addMeasure,
  updateMeasure,
  deleteMeasure,
  selectAllMeasuresWithType,
  selectMeasureById
} from '../measuresSlice'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const MeasuresPage = () => {
  const MeasuresWrapped = withSearch(withCrud2(MeasuresListView))
  return (
    <MeasuresWrapped
      defaultSort={defaultSort}
      addItem={addMeasure}
      getAllItems={getMeasures}
      updateItem={updateMeasure}
      deleteItem={deleteMeasure}
      selectAllItems={selectAllMeasuresWithType}
      selectItemById={selectMeasureById}
    />
  )
}

export default MeasuresPage