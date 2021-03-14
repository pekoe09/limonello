import React from 'react'
import { connect } from 'react-redux'
import MeasureEditView from './MeasureEditView'
import { withCrud } from '../../core'
import {
  saveMeasure,
  getMeasures,
  deleteMeasure
} from '../measureActions'

const MeasureEditPage = props => {
  const id = null

  const MeasureEditWrapped = withCrud(MeasureEditView)
  return (
    <MeasureEditWrapped
      repository={'measures'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveMeasure}
      getAllItems={props.getMeasures}
      updateItem={props.saveMeasure}
      deleteItem={props.deleteMeasure}
    />
  )
}

export default connect(
  null,
  {
    saveMeasure,
    getMeasures,
    deleteMeasure
  }
)(MeasureEditPage)