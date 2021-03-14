import React from 'react'
import { connect } from 'react-redux'
import IngredientEditView from './IngredientEditView'
import { withCrud } from '../../core'
import {
  saveIngredient,
  getIngredients,
  deleteIngredient
} from '../ingredientActions'

const IngredientEditPage = props => {
  const id = null

  const IngredientEditWrapped = withCrud(IngredientEditView)
  return (
    <IngredientEditWrapped
      repository={'ingredients'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveIngredient}
      getAllItems={props.getIngredients}
      updateItem={props.saveIngredient}
      deleteItem={props.deleteIngredient}
    />
  )
}

export default connect(
  null,
  {
    saveIngredient,
    getIngredients,
    deleteIngredient
  }
)(IngredientEditPage)