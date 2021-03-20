import React from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { makeGetBeersWithCountryAndType } from '../beerSelector'
import {
  LimonelloForm,
  LimonelloFormLabel,
  PageTitle
} from '../../core'

function BeerDetailsView({ beer }) {
  console.log('beer details view props', beer)
  //const beer = { name: 'test' }
  let history = useHistory()

  const handleReturn = () => {
    history.push('/beers')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={beer ? `${beer.name}` : ''}
        />
      </Row>
      <Row>
        <LimonelloForm style={{ width: '50%' }}>
          <LimonelloForm.Group as={Row} controlId='name'>
            <LimonelloFormLabel column sm='3'>Nimi</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.name} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='beerType'>
            <LimonelloFormLabel column sm='3'>Tyyppi</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.beerType.name} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='cpuntry'>
            <LimonelloFormLabel column sm='3'>Maa</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.country.name} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='brewery'>
            <LimonelloFormLabel column sm='3'>Panimo</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.brewery} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='stars'>
            <LimonelloFormLabel column sm='3'>Tähtiä</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.stars} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='alcohol'>
            <LimonelloFormLabel column sm='3'>Alkoholi-%</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.alcohol} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='hoppiness'>
            <LimonelloFormLabel column sm='3'>Humalaisuus</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.hoppiness} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='sweetness'>
            <LimonelloFormLabel column sm='3'>Makeus</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.sweetness} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='price'>
            <LimonelloFormLabel column sm='3'>Hinta</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.price} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='boughtFrom'>
            <LimonelloFormLabel column sm='3'>Ostopaikka</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.boughtFrom} />
            </Col>
          </LimonelloForm.Group>
          <LimonelloForm.Group as={Row} controlId='comment'>
            <LimonelloFormLabel column sm='3'>Kommentti</LimonelloFormLabel>
            <Col sm='9'>
              <LimonelloForm.Control plaintext readOnly value={beer.comment} />
            </Col>
          </LimonelloForm.Group>
        </LimonelloForm>
      </Row>
    </div>
  )
}

const makeMapStateToProps = (store, ownProps) => {
  const getBeersWithCountryAndType = makeGetBeersWithCountryAndType()
  return store => {
    const beers = getBeersWithCountryAndType(store)
    console.log('beer', beers.find(b => b._id === ownProps.match.params.id))
    return {
      beer: beers.find(b => b._id === ownProps.match.params.id)
    }
  }
}

export default withRouter(connect(
  makeMapStateToProps
)(BeerDetailsView))