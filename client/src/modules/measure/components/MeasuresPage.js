import React from 'react'
import { connect } from 'react-redux'
import MeasuresListView from './MeasuresListView'
import { withCrud, withSearch } from '../../core'
import {
  saveMeasure,
  getMeasures,
  deleteMeasure
} from '../measureActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const MeasuresPage = props => {
  const MeasuresWrapped = withSearch(withCrud(MeasuresListView))
  return (
    <MeasuresWrapped
      repository={'measures'}
      defaultSort={defaultSort}
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
)(MeasuresPage)