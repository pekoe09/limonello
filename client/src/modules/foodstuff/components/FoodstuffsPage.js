import React from 'react'
import { connect } from 'react-redux'
import FoodstuffsListView from './FoodstuffsListView'
import { withCrud, withSearch } from '../../core'
import {
  saveFoodstuff,
  getFoodstuffs,
  deleteFoodstuff
} from '../foodstuffActions'

const defaultSort = (a, b) =>
  a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)

const FoodstuffsPage = props => {
  const FoodstuffsWrapped = withSearch(withCrud(FoodstuffsListView))
  return (
    <FoodstuffsWrapped
      repository={'foodstuffs'}
      defaultSort={defaultSort}
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
)(FoodstuffsPage)