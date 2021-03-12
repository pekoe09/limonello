import React from 'react'
import { connect } from 'react-redux'
import BeerTypeEditView from './BeerTypeEditView'
import { withCrud } from '../../core'
import {
  saveBeerType,
  getBeerTypes,
  deleteBeerType
} from '../beerTypeActions'

const BeerTypeEditPage = props => {
  const id = null

  const BeerTypeEditWrapped = withCrud(BeerTypeEditView)
  return (
    <BeerTypeEditWrapped
      repository={'beerTypes'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveBeerType}
      getAllItems={props.getBeerTypes}
      updateItem={props.saveBeerType}
      deleteItem={props.deleteBeerType}
    />
  )
}

export default connect(
  null,
  {
    saveBeerType,
    getBeerTypes,
    deleteBeerType
  }
)(BeerTypeEditPage)