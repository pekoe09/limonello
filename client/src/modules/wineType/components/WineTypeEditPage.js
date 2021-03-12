import React from 'react'
import { connect } from 'react-redux'
import WineTypeEditView from './WineTypeEditView'
import { withCrud } from '../../core'
import {
  saveWineType,
  getWineTypes,
  deleteWineType
} from '../wineTypeActions'

const WineTypeEditPage = props => {
  const id = null

  const WineTypeEditWrapped = withCrud(WineTypeEditView)
  return (
    <WineTypeEditWrapped
      repository={'wineTypes'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveWineType}
      getAllItems={props.getWineTypes}
      updateItem={props.saveWineType}
      deleteItem={props.deleteWineType}
    />
  )
}

export default connect(
  null,
  {
    saveWineType,
    getWineTypes,
    deleteWineType
  }
)(WineTypeEditPage)