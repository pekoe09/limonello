import React from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import {
  LimonelloForm,
  LimonelloFormLabel,
  PageTitle
} from '../../core'
import {
  selectBeerTypeById
} from '../../beertype'
import {
  selectCountryById
} from '../../country'

const BeerDetailsView = ({
  match,
  selectItemById
}) => {
  let history = useHistory()

  const beerId = match.params.id
  let beer = useSelector(state => selectItemById(state, beerId))
  const beerType = useSelector(state => selectBeerTypeById(state, beer.beerType))
  const country = useSelector(state => selectCountryById(state, beer.country))
  beer = { ...beer, beerType, country }

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

export default withRouter(BeerDetailsView)