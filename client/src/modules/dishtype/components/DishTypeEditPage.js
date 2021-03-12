import React from 'react'
import { connect } from 'react-redux'
import DishTypeEditView from './DishTypeEditView'
import { withCrud } from '../../core'
import {
  saveDishType,
  getDishTypes,
  deleteDishType
} from '../dishTypeActions'

const DishTypeEditPage = props => {
  const id = null

  const DishTypeEditWrapped = withCrud(DishTypeEditView)
  return (
    <DishTypeEditWrapped
      repository={'dishTypes'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveDishType}
      getAllItems={props.getDishTypes}
      updateItem={props.saveDishType}
      deleteItem={props.deleteDishType}
    />
  )
}

export default connect(
  null,
  {
    saveDishType,
    getDishTypes,
    deleteDishType
  }
)(DishTypeEditPage)