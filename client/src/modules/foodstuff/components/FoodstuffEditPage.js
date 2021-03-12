import React from 'react'
import { connect } from 'react-redux'
import FoodstuffEditView from './FoodstuffEditView'
import { withCrud } from '../../core'
import {
  saveFoodstuff,
  getFoodstuffs,
  deleteFoodstuff
} from '../foodstuffActions'

const FoodstuffEditPage = props => {
  const id = null

  const FoodstuffEditWrapped = withCrud(FoodstuffEditView)
  return (
    <FoodstuffEditWrapped
      repository={'foodstuffs'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveFoodstuff}
      getAllItems={props.getFoodstuffs}
      updateItem={props.saveFoodstuff}
      deleteItem={props.deleteFoodstuff}
    />
  )
}

export default connect(
  null,
  {
    saveFoodstuff,
    getFoodstuffs,
    deleteFoodstuff
  }
)(FoodstuffEditPage)