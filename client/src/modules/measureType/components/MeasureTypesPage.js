import React from 'react'
import { connect } from 'react-redux'
import MeasureTypesListView from './MeasureTypesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveMeasureType,
  getMeasureTypes,
  deleteMeasureType
} from '../measureTypeActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const MeasureTypesPage = props => {
  const MeasureTypesWrapped = withSearch(withCrud(MeasureTypesListView))
  return (
    <MeasureTypesWrapped
      repository={'measureTypes'}
      defaultSort={defaultSort}
      addItem={props.saveMeasureType}
      getAllItems={props.getMeasureTypes}
      updateItem={props.saveMeasureType}
      deleteItem={props.deleteMeasureType}
    />
  )
}

export default connect(
  null,
  {
    saveMeasureType,
    getMeasureTypes,
    deleteMeasureType
  }
)(MeasureTypesPage)