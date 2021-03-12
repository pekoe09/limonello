import React from 'react'
import { connect } from 'react-redux'
import GrapeEditView from './GrapeEditView'
import { withCrud } from '../../core'
import {
  saveGrape,
  getGrapes,
  deleteGrape
} from '../grapeActions'

const GrapeEditPage = props => {
  const id = null

  const GrapeEditWrapped = withCrud(GrapeEditView)
  return (
    <GrapeEditWrapped
      repository={'grapes'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveGrape}
      getAllItems={props.getGrapes}
      updateItem={props.saveGrape}
      deleteItem={props.deleteGrape}
    />
  )
}

export default connect(
  null,
  {
    saveGrape,
    getGrapes,
    deleteGrape
  }
)(GrapeEditPage)