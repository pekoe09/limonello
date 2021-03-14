import React from 'react'
import { connect } from 'react-redux'
import RegionEditView from './RegionEditView'
import { withCrud } from '../../core'
import {
  saveRegion,
  getRegions,
  deleteRegion
} from '../regionActions'

const RegionEditPage = props => {
  const id = null

  const RegionEditWrapped = withCrud(RegionEditView)
  return (
    <RegionEditWrapped
      repository={'regions'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveRegion}
      getAllItems={props.getRegions}
      updateItem={props.saveRegion}
      deleteItem={props.deleteRegion}
    />
  )
}

export default connect(
  null,
  {
    saveRegion,
    getRegions,
    deleteRegion
  }
)(RegionEditPage)