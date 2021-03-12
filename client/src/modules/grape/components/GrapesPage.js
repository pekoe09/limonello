import React from 'react'
import { connect } from 'react-redux'
import GrapesListView from './GrapesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveGrape,
  getGrapes,
  deleteGrape
} from '../grapeActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const GrapesPage = props => {
  const GrapesWrapped = withSearch(withCrud(GrapesListView))
  return (
    <GrapesWrapped
      repository={'grapes'}
      defaultSort={defaultSort}
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
)(GrapesPage)