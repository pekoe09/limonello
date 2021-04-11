import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import { LimonelloButton } from '../../core'

const GrapeItem = ({
  grape,
  portion,
  handleRemove
}) => {
  return (
    <Container fluid>
      <Row>
        <Col>{grape.name}</Col>
        <Col sm={4}>{(portion && portion > 0) ? `${portion} %` : ''}</Col>
        <Col sm='auto'>
          <LimonelloButton
            bsstyle='rowdanger'
            onClick={() => handleRemove(grape._id)}
          >
            Poista
          </LimonelloButton>
        </Col>
      </Row>
    </Container>
  )
}

export default GrapeItem

GrapeItem.propTypes = {
  grape: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  handleRemove: PropTypes.func.isRequired
}