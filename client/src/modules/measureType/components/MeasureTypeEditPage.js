import React from 'react'
import { connect } from 'react-redux'
import MeasureTypeEditView from './MeasureTypeEditView'
import { withCrud } from '../../core'
import {
  saveMeasureType,
  getMeasureTypes,
  deleteMeasureType
} from '../measureTypeActions'

const MeasureTypeEditPage = props => {
  const id = null

  const MeasureTypeEditWrapped = withCrud(MeasureTypeEditView)
  return (
    <MeasureTypeEditWrapped
      repository={'measureTypes'}
      id={id}
      defaultSort={() => {}}
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
)(MeasureTypeEditPage)