import React from 'react'
import GrapeEditView from './GrapeEditView'
import { withCrud2 } from '../../core'
import {
  getGrapes,
  addGrape,
  updateGrape,
  deleteGrape,
  selectAllGrapes,
  selectGrapeById
} from '../grapesSlice'

const GrapeEditPage = () => {
  const GrapeEditWrapped = withCrud2(GrapeEditView)
  return (
    <GrapeEditWrapped
      defaultSort={() => { }}
      addItem={addGrape}
      getAllItems={getGrapes}
      updateItem={updateGrape}
      deleteItem={deleteGrape}
      selectItemById={selectGrapeById}
      selectAllItems={selectAllGrapes}
    />
  )
}

export default GrapeEditPage