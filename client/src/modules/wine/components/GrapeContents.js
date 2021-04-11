import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import GrapeItem from './GrapeItem'
import GrapeAddForm from './GrapeAddForm'

const getGrapeItems = (grapePortions, handleRemove) => {
  return grapePortions.map(g =>
    <GrapeItem
      grape={g.grape}
      portion={g.portion}
      handleRemove={handleRemove}
      key={g.grape}
    />
  )
}

const GrapeContents = ({
  allGrapes,
  grapePortions,
  handleAdd,
  handleRemove
}) => {
  let grapePortionsWithDetails = grapePortions.map(p => {
    let grapeWithDetails = allGrapes.find(g => g._id === p.grape)
    return { ...p, grape: grapeWithDetails }
  })

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      {getGrapeItems(grapePortionsWithDetails, handleRemove)}
      <GrapeAddForm
        allGrapes={allGrapes}
        handleAdd={handleAdd}
      />
    </Container>
  )
}

export default GrapeContents

GrapeContents.propTypes = {
  allGrapes: PropTypes.array.isRequired,
  grapePortions: PropTypes.array.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}